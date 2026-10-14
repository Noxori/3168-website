import * as THREE from "three";
import { gsap } from "gsap";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export interface HeroSceneHandle {
  /** Play the choreographed entrance (logo assembles, camera pushes in). */
  intro: () => void;
  dispose: () => void;
}

const GOLD = 0xd4af37;
const RED = 0xff0000;

export function createHeroScene(
  canvas: HTMLCanvasElement,
  opts: {
    reducedMotion: boolean;
    onReady?: () => void;
  },
): HeroSceneHandle {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const isSmall = window.innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.6 : 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.055);

  const camera = new THREE.PerspectiveCamera(
    42,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100,
  );

  // pull back on narrow screens so the wordmark always fits the frame
  const fitZ = (aspect: number) =>
    aspect >= 1 ? 6.9 : Math.min(6.9 * (1 + (1 - aspect) * 1.7), 16);
  const startZ = () => fitZ(canvas.clientWidth / Math.max(canvas.clientHeight, 1)) + 1.8;

  camera.position.set(0, 0.15, startZ());
  camera.rotation.z = -0.055; // permanent dutch angle

  // Environment reflections for the metal
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  scene.environment = envTex;

  /* ---------------------------------- lights --------------------------------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.12));

  const goldSpot = new THREE.SpotLight(GOLD, 170, 40, 0.55, 0.65, 1.6);
  goldSpot.position.set(-6, 7, 6);
  scene.add(goldSpot);

  const goldSpot2 = new THREE.SpotLight(0xffe9a8, 70, 40, 0.5, 0.8, 1.8);
  goldSpot2.position.set(7, 3, 5);
  scene.add(goldSpot2);

  // red bleed from behind — light through the cracks
  const redBack = new THREE.PointLight(RED, 38, 22, 1.9);
  redBack.position.set(0, 1.1, -2.6);
  scene.add(redBack);

  /* ------------------------------ polished floor ----------------------------- */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
      color: 0x030303,
      metalness: 0.7,
      roughness: 0.55,
      envMapIntensity: 0.28,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.55;
  scene.add(floor);

  /* --------------------------------- particles ------------------------------- */
  const makeParticles = (count: number, color: number, size: number) => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.35) * 6;
      pos[i * 3 + 2] = Math.sin(theta) * r * 0.7 - 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  };

  const particleCount = isSmall ? 260 : 620;
  const goldDust = makeParticles(particleCount, GOLD, 0.045);
  const redDust = makeParticles(Math.floor(particleCount / 4), RED, 0.06);
  scene.add(goldDust, redDust);

  /* ------------------------------- the wordmark ------------------------------ */
  const logoGroup = new THREE.Group();
  scene.add(logoGroup);
  logoGroup.position.y = 0.28;

  let disposed = false;
  let ready = false;
  let frame = 0;

  const logoMat = new THREE.MeshPhysicalMaterial({
    color: GOLD,
    metalness: 1,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.85,
  });
  const crackMat = new THREE.MeshBasicMaterial({
    color: RED,
    wireframe: true,
    transparent: true,
    opacity: 0.32,
  });

  new FontLoader().load("/fonts/bebas-neue.typeface.json", (font: Font) => {
    if (disposed) return;
    const geo = new TextGeometry("3168", {
      font,
      size: 2.1,
      depth: 0.5,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.055,
      bevelSize: 0.035,
      bevelSegments: 4,
    });
    geo.center();

    const logo = new THREE.Mesh(geo, logoMat);
    logoGroup.add(logo);

    // red energy shell — cracks bleeding light
    const shell = new THREE.Mesh(geo, crackMat);
    shell.scale.setScalar(1.013);
    logoGroup.add(shell);

    if (opts.reducedMotion) {
      logoGroup.rotation.y = 0;
      renderOnce();
    } else {
      // pre-intro pose: fragments pulled back, assembled by intro()
      logoGroup.scale.setScalar(0.55);
      logoGroup.rotation.y = -0.7;
      logoGroup.position.y = 0.9;
      startLoop();
    }
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  });

  /* --------------------------------- animation ------------------------------- */
  const clock = new THREE.Clock();
  const pointer = { x: 0, y: 0 };
  const smoothed = { x: 0, y: 0 };
  let rafId = 0;
  let looping = false;

  function renderFrame() {
    const t = clock.getElapsedTime();

    // idle motion: slow breathing rotation + float
    logoGroup.rotation.y += 0.0016;
    logoGroup.position.y += Math.sin(t * 0.8) * 0.0011;

    // particle drift — swirl like dust in a club spotlight
    goldDust.rotation.y = t * 0.05;
    redDust.rotation.y = -t * 0.035;
    goldDust.position.y = Math.sin(t * 0.35) * 0.25;
    redDust.position.y = Math.cos(t * 0.3) * 0.3;

    // red light breathes through the cracks
    redBack.intensity = 34 + Math.sin(t * 1.4) * 10;
    crackMat.opacity = 0.26 + Math.sin(t * 1.4) * 0.08;

    // pointer parallax
    smoothed.x += (pointer.x - smoothed.x) * 0.04;
    smoothed.y += (pointer.y - smoothed.y) * 0.04;
    camera.position.x = smoothed.x * 0.7;
    camera.position.y = 0.15 + smoothed.y * 0.45;
    camera.lookAt(0, 0.25, 0);
    camera.rotation.z += -0.055;

    renderer.render(scene, camera);
  }

  function loop() {
    if (disposed) return;
    frame++;
    if (isSmall && frame % 2 === 1 && frame > 2) {
      // half-rate on small screens to save battery
      rafId = requestAnimationFrame(loop);
      return;
    }
    renderFrame();
    rafId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (looping || disposed) return;
    looping = true;
    rafId = requestAnimationFrame(loop);
  }

  function renderOnce() {
    renderer.render(scene, camera);
  }

  const onPointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  const onResize = () => {
    const w = canvas.clientWidth;
    const h = Math.max(canvas.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = fitZ(camera.aspect);
    camera.updateProjectionMatrix();
    if (opts.reducedMotion) renderOnce();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResize);

  /* ---------------------------- public interface ----------------------------- */
  return {
    intro() {
      if (opts.reducedMotion || disposed) return;
      // assembled from fragments, camera pushes in — gsap drives the transforms
      gsap.to(logoGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2.2,
        ease: "power3.out",
      });
      gsap.to(logoGroup.rotation, {
        y: 0,
        duration: 2.4,
        ease: "power3.out",
      });
      gsap.to(logoGroup.position, {
        y: 0.28,
        duration: 2.2,
        ease: "power3.out",
      });
      gsap.to(camera.position, {
        z: fitZ(canvas.clientWidth / Math.max(canvas.clientHeight, 1)),
        duration: 2.6,
        ease: "power2.inOut",
      });
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
