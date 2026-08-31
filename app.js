/**
 * ============================================
 * PHYSICS 3D OPTICS LEARNING PLATFORM
 * Interactive AR/VR-style Educational Module
 * Reflection & Refraction
 * ============================================
 */

// ==================== APP STATE ====================
const AppState = {
    currentSection: 'hero',
    currentModule: null,
    currentQuiz: null,
    score: 0,
    totalScore: 0,
    stars: 0,
    completedModules: [],
    moduleScores: {},
    playerName: 'Student',
    quizData: {}
};

// ==================== QUIZ DATABASE ====================
const QuizDatabase = {
    reflection: {
        title: "Reflection of Light",
        questions: [
            {
                question: "What is the angle of reflection when a light ray hits a plane mirror at 45°?",
                options: ["22.5°", "45°", "90°", "0°"],
                correct: 1,
                explanation: "According to the law of reflection, the angle of incidence equals the angle of reflection. So if the angle of incidence is 45°, the angle of reflection is also 45°. The formula is: θᵢ = θᵣ"
            },
            {
                question: "Which type of mirror always forms a virtual, erect, and diminished image?",
                options: ["Plane mirror", "Concave mirror", "Convex mirror", "None of these"],
                correct: 2,
                explanation: "A convex mirror always forms a virtual, erect, and diminished image regardless of the object's position. The image is formed behind the mirror and is smaller than the object."
            },
            {
                question: "At which point does a concave mirror form an image at infinity?",
                options: ["Beyond C", "At C", "At F (focus)", "Between F and mirror"],
                correct: 2,
                explanation: "When an object is placed at the focus (F) of a concave mirror, the reflected rays become parallel and the image is formed at infinity."
            },
            {
                question: "What is the mirror formula?",
                options: [
                    "1/v + 1/u = 1/f",
                    "1/v - 1/u = 1/f",
                    "1/v + 1/u = 2/f",
                    "v + u = f"
                ],
                correct: 0,
                explanation: "The mirror formula is 1/v + 1/u = 1/f, where v is the image distance, u is the object distance, and f is the focal length of the mirror."
            },
            {
                question: "A concave mirror has a focal length of 20 cm. What is its radius of curvature?",
                options: ["10 cm", "20 cm", "40 cm", "80 cm"],
                correct: 2,
                explanation: "The radius of curvature (R) is twice the focal length (f). R = 2f = 2 × 20 cm = 40 cm."
            }
        ]
    },
    refraction: {
        title: "Refraction of Light",
        questions: [
            {
                question: "What is the refractive index of water approximately?",
                options: ["1.0", "1.33", "1.52", "2.42"],
                correct: 1,
                explanation: "The refractive index of water is approximately 1.33 (or 4/3). This means light travels about 1.33 times slower in water than in vacuum."
            },
            {
                question: "When light travels from a denser to a rarer medium, it:",
                options: [
                    "Bends towards the normal",
                    "Bends away from the normal",
                    "Does not bend",
                    "Reverses direction"
                ],
                correct: 1,
                explanation: "When light travels from a denser medium (higher refractive index) to a rarer medium (lower refractive index), it bends away from the normal. This is described by Snell's law."
            },
            {
                question: "What is the lens formula?",
                options: [
                    "1/v + 1/u = 1/f",
                    "1/v - 1/u = 1/f",
                    "1/v × 1/u = 1/f",
                    "v + u = f"
                ],
                correct: 1,
                explanation: "The lens formula is 1/v - 1/u = 1/f, where v is image distance, u is object distance, and f is focal length. Note the minus sign difference from the mirror formula."
            },
            {
                question: "A convex lens forms a real, inverted image when the object is:",
                options: [
                    "At the focus",
                    "Between F and 2F",
                    "Beyond 2F",
                    "Both B and C"
                ],
                correct: 3,
                explanation: "A convex lens forms real, inverted images when the object is placed beyond the focus (F). Both between F and 2F, and beyond 2F positions produce real, inverted images (though image size varies)."
            },
            {
                question: "Total Internal Reflection occurs when light travels from:",
                options: [
                    "Rarer to denser medium",
                    "Denser to rarer medium at small angles",
                    "Denser to rarer medium beyond critical angle",
                    "Any medium to vacuum"
                ],
                correct: 2,
                explanation: "Total Internal Reflection (TIR) occurs when light travels from a denser to a rarer medium and the angle of incidence exceeds the critical angle. At this point, no refraction occurs and all light is reflected back."
            }
        ]
    },
    advanced: {
        title: "Advanced Optics",
        questions: [
            {
                question: "What is the power of a lens with focal length 50 cm?",
                options: ["0.2 D", "2 D", "5 D", "50 D"],
                correct: 1,
                explanation: "Power of a lens = 1/f (in meters). f = 50 cm = 0.5 m. Power = 1/0.5 = 2 Diopters (D)."
            },
            {
                question: "The phenomenon responsible for the sparkle of a diamond is:",
                options: [
                    "Refraction",
                    "Dispersion",
                    "Total Internal Reflection",
                    "Diffraction"
                ],
                correct: 2,
                explanation: "Diamond sparkles due to Total Internal Reflection. Diamond has a very high refractive index (2.42), which means its critical angle is very small (~24.4°). Multiple TIRs inside the diamond create the sparkle effect."
            },
            {
                question: "A rainbow is formed due to which combination of phenomena?",
                options: [
                    "Reflection only",
                    "Refraction and Dispersion",
                    "Diffraction only",
                    "Polarization"
                ],
                correct: 1,
                explanation: "A rainbow is formed by the refraction, dispersion, and internal reflection of sunlight in water droplets. The dispersion separates white light into its component colors."
            },
            {
                question: "What happens to the image size when a convex mirror is used as a rear-view mirror?",
                options: [
                    "Image is enlarged",
                    "Image is same size",
                    "Image is diminished",
                    "Image is inverted"
                ],
                correct: 2,
                explanation: "Convex mirrors always produce diminished (smaller) images, which allows drivers to see a wider field of view. This is why they are used as rear-view mirrors in vehicles."
            },
            {
                question: "The critical angle for glass (n=1.5) is approximately:",
                options: ["30°", "42°", "48°", "60°"],
                correct: 1,
                explanation: "Critical angle θc = sin⁻¹(1/n) = sin⁻¹(1/1.5) = sin⁻¹(0.667) ≈ 41.8° ≈ 42°."
            }
        ]
    }
};

// ==================== THREE.JS 3D SCENES ====================

class OpticsLab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.objects = [];
        this.rays = [];
        this.isDragging = false;
        this.dragObject = null;
        this.animationId = null;

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);
        this.scene.fog = new THREE.FogExp2(0x050510, 0.02);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00d4ff, 1, 50);
        pointLight.position.set(5, 10, 5);
        pointLight.castShadow = true;
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.5, 50);
        pointLight2.position.set(-5, 8, -5);
        this.scene.add(pointLight2);

        // Ground grid
        this.createGrid();

        // Events
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.container.addEventListener('mouseup', () => this.onMouseUp());
        window.addEventListener('resize', () => this.onResize());

        this.animate();
    }

    createGrid() {
        const gridHelper = new THREE.GridHelper(30, 30, 0x00d4ff, 0x111133);
        gridHelper.position.y = -0.01;
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }

    updateMousePosition(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    onMouseMove(event) {
        this.updateMousePosition(event);

        if (this.isDragging && this.dragObject) {
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const intersect = new THREE.Vector3();
            this.raycaster.ray.intersectPlane(plane, intersect);
            if (intersect) {
                this.dragObject.position.x = intersect.x;
                this.dragObject.position.y = Math.max(0.5, Math.min(intersect.y, 8));
                if (this.onObjectMoved) this.onObjectMoved(this.dragObject);
            }
        }
    }

    onMouseDown(event) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.objects);
        if (intersects.length > 0) {
            this.isDragging = true;
            this.dragObject = intersects[0].object;
            this.container.style.cursor = 'grabbing';
        }
    }

    onMouseUp() {
        this.isDragging = false;
        this.dragObject = null;
        this.container.style.cursor = 'default';
    }

    onResize() {
        if (!this.container) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) {
            this.renderer.dispose();
            if (this.container && this.renderer.domElement) {
                this.container.removeChild(this.renderer.domElement);
            }
        }
    }

    clearObjects() {
        this.objects.forEach(obj => this.scene.remove(obj));
        this.objects = [];
        this.rays.forEach(ray => this.scene.remove(ray));
        this.rays = [];
        this.clearImageMarker();
    }

    // ---- Virtual / real image locator ----
    // Each reflected/refracted ray is logged as it leaves the mirror or lens
    // (a point + direction). Once at least two are known, the point where
    // they truly cross (real image) — or where their backward extensions
    // cross behind the mirror/lens (virtual image) — can be solved for.
    // This scales to however many rays are traced: 2, 3, or more.
    beginImageTracking() {
        this._imageRays = [];
    }

    recordImageRay(p0, p1) {
        const dir = new THREE.Vector3(p1.x - p0.x, p1.y - p0.y, 0);
        const len = dir.length();
        if (len < 1e-6) return;
        dir.multiplyScalar(1 / len);
        this._imageRays.push({ point: new THREE.Vector3(p0.x, p0.y, 0), dir });
    }

    clearImageMarker() {
        (this._imageMarkerObjs || []).forEach(o => this.scene.remove(o));
        this._imageMarkerObjs = [];
    }

    static closestPointToLines(rays) {
        let Axx = 0, Axy = 0, Ayy = 0, bx = 0, by = 0;
        rays.forEach(r => {
            const dx = r.dir.x, dy = r.dir.y;
            const mxx = 1 - dx * dx, mxy = -dx * dy, myy = 1 - dy * dy;
            Axx += mxx; Axy += mxy; Ayy += myy;
            bx += mxx * r.point.x + mxy * r.point.y;
            by += mxy * r.point.x + myy * r.point.y;
        });
        const det = Axx * Ayy - Axy * Axy;
        if (Math.abs(det) < 1e-6) return null;
        return new THREE.Vector3((bx * Ayy - by * Axy) / det, (Axx * by - Axy * bx) / det, 0);
    }

    finalizeImageMarker() {
        this.clearImageMarker();
        const rays = this._imageRays || [];
        if (rays.length < 2) return; // need at least two rays to triangulate an image point

        const X = OpticsLab.closestPointToLines(rays);
        if (!X) return; // rays are (near) parallel — no finite image (object at infinity)
        X.z = 0.08;

        let behind = 0, front = 0;
        rays.forEach(r => {
            const t = (X.x - r.point.x) * r.dir.x + (X.y - r.point.y) * r.dir.y;
            r.t = t;
            if (t < -0.05) behind++; else if (t > 0.05) front++;
        });
        if (behind === 0 && front === 0) return;
        this.drawImageMarker(rays, X, behind >= front);
    }

    drawImageMarker(rays, X, isVirtual) {
        const color = isVirtual ? 0x8fffff : 0x00ff88;

        if (isVirtual) {
            // Dashed lines: the reflected/refracted rays extended backward,
            // through the mirror/lens, to where they appear to originate.
            rays.forEach(r => {
                if (r.t >= -0.05) return;
                const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.14, gapSize: 0.11, transparent: true, opacity: 0.8 });
                const geo = new THREE.BufferGeometry().setFromPoints([r.point.clone(), X.clone()]);
                const line = new THREE.Line(geo, mat);
                line.computeLineDistances();
                this.scene.add(line);
                this._imageMarkerObjs.push(line);
            });
        }

        // Hollow dashed ring = virtual image; solid glowing disc = real image.
        const ringGeom = new THREE.RingGeometry(isVirtual ? 0.18 : 0.02, 0.3, 24);
        const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: isVirtual ? 0.55 : 0.85, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.copy(X);
        this.scene.add(ring);
        this._imageMarkerObjs.push(ring);

        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 }));
        glow.position.copy(X);
        this.scene.add(glow);
        this._imageMarkerObjs.push(glow);
    }
}

// ==================== MIRROR SCENE ====================

class MirrorScene extends OpticsLab {
    constructor(containerId) {
        super(containerId);
        this.mirrorType = 'concave';
        this.objectPos = { x: -6, y: 2 };
        this.focalLength = 3;
        this.showRays = true;
        this.setupMirrorScene();
    }

    setupMirrorScene() {
        this.clearObjects();
        this.createMirror();
        this.createObject();
        this.createOpticalAxis();
        this.updateRays();
    }

    createMirror() {
        // Remove old mirror
        const oldMirror = this.scene.getObjectByName('mirror');
        if (oldMirror) this.scene.remove(oldMirror);

        const curve = new THREE.Group();
        curve.name = 'mirror';

        let mirrorCurve;
        const segments = 64;
        const height = 5;

        if (this.mirrorType === 'plane') {
            const geometry = new THREE.PlaneGeometry(0.3, height);
            const material = new THREE.MeshPhongMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide,
                emissive: 0x003366,
                emissiveIntensity: 0.2
            });
            const mirror = new THREE.Mesh(geometry, material);
            mirror.position.set(0, height / 2, 0);
            mirror.name = 'mirror';
            this.scene.add(mirror);

            // Reflective surface indicator
            const surfaceGeom = new THREE.PlaneGeometry(0.05, height);
            const surfaceMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.DoubleSide });
            const surface = new THREE.Mesh(surfaceGeom, surfaceMat);
            surface.position.set(-0.15, height / 2, 0);
            this.scene.add(surface);
        } else {
            // Curved mirror
            const points = [];
            const curvature = this.mirrorType === 'concave' ? 0.15 : -0.1;

            for (let i = 0; i <= segments; i++) {
                const t = (i / segments) - 0.5;
                const y = t * height;
                const x = curvature * y * y; // Parabolic curve
                points.push(new THREE.Vector3(x, y + height / 2, 0));
            }

            const path = new THREE.CatmullRomCurve3(points);
            const tubeGeom = new THREE.TubeGeometry(path, 64, 0.12, 8, false);
            const tubeMat = new THREE.MeshPhongMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.9,
                emissive: 0x003366,
                emissiveIntensity: 0.3
            });
            const mirrorMesh = new THREE.Mesh(tubeGeom, tubeMat);
            mirrorMesh.name = 'mirror';
            this.scene.add(mirrorMesh);

            // Reflective surface
            const surfacePoints = points.map(p => new THREE.Vector3(p.x - 0.06, p.y, p.z));
            const surfacePath = new THREE.CatmullRomCurve3(surfacePoints);
            const surfaceGeom = new THREE.TubeGeometry(surfacePath, 64, 0.03, 8, false);
            const surfaceMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
            const surface = new THREE.Mesh(surfaceGeom, surfaceMat);
            this.scene.add(surface);

            // Back surface (hatching for mirror back)
            const backPoints = points.map(p => new THREE.Vector3(p.x + 0.06, p.y, p.z));
            const backPath = new THREE.CatmullRomCurve3(backPoints);
            const backGeom = new THREE.TubeGeometry(backPath, 64, 0.03, 8, false);
            const backMat = new THREE.MeshBasicMaterial({ color: 0x444466 });
            const back = new THREE.Mesh(backGeom, backMat);
            this.scene.add(back);
        }

        // Focus point
        this.createFocusPoint();
        this.createCenterPoint();
    }

    createFocusPoint() {
        const oldF = this.scene.getObjectByName('focusPoint');
        if (oldF) this.scene.remove(oldF);

        const fSign = this.mirrorType === 'concave' ? -1 : 1;
        const fX = fSign * this.focalLength;

        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const focus = new THREE.Mesh(geometry, material);
        focus.position.set(fX, 0, 0);
        focus.name = 'focusPoint';
        this.scene.add(focus);

        // Glow
        const glowGeom = new THREE.SphereGeometry(0.35, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.2 });
        const glow = new THREE.Mesh(glowGeom, glowMat);
        glow.position.copy(focus.position);
        this.scene.add(glow);
    }

    createCenterPoint() {
        const oldC = this.scene.getObjectByName('centerPoint');
        if (oldC) this.scene.remove(oldC);

        const cSign = this.mirrorType === 'concave' ? -1 : 1;
        const cX = cSign * this.focalLength * 2;

        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xec4899 });
        const center = new THREE.Mesh(geometry, material);
        center.position.set(cX, 0, 0);
        center.name = 'centerPoint';
        this.scene.add(center);
    }

    createOpticalAxis() {
        const oldAxis = this.scene.getObjectByName('opticalAxis');
        if (oldAxis) this.scene.remove(oldAxis);

        const material = new THREE.LineBasicMaterial({ color: 0x333366, transparent: true, opacity: 0.5 });
        const points = [new THREE.Vector3(-15, 0, 0), new THREE.Vector3(15, 0, 0)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        line.name = 'opticalAxis';
        this.scene.add(line);
    }

    createObject() {
        // Remove old object
        const oldObj = this.scene.getObjectByName('object3d');
        if (oldObj) this.scene.remove(oldObj);

        // Object (an arrow/candle)
        const objGroup = new THREE.Group();
        objGroup.name = 'object3d';

        // Arrow body
        const bodyGeom = new THREE.CylinderGeometry(0.08, 0.08, this.objectPos.y, 8);
        const bodyMat = new THREE.MeshPhongMaterial({ color: 0xff6b35, emissive: 0x331100 });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        body.position.y = this.objectPos.y / 2;
        objGroup.add(body);

        // Arrow head
        const headGeom = new THREE.ConeGeometry(0.2, 0.4, 8);
        const headMat = new THREE.MeshPhongMaterial({ color: 0xff3333, emissive: 0x330000 });
        const head = new THREE.Mesh(headGeom, headMat);
        head.position.y = this.objectPos.y + 0.2;
        objGroup.add(head);

        // Glow
        const glowGeom = new THREE.SphereGeometry(0.3, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.15 });
        const glow = new THREE.Mesh(glowGeom, glowMat);
        glow.position.y = this.objectPos.y;
        objGroup.add(glow);

        objGroup.position.set(this.objectPos.x, 0, 0);
        this.scene.add(objGroup);
        this.objects.push(objGroup);
    }

    updateRays() {
        // Clear old rays
        this.rays.forEach(ray => this.scene.remove(ray));
        this.rays = [];

        if (!this.showRays) return;

        this.beginImageTracking();

        const objX = this.objectPos.x;
        const objY = this.objectPos.y;
        const fX = this.mirrorType === 'concave' ? -this.focalLength : this.focalLength;
        const cX = this.mirrorType === 'concave' ? -this.focalLength * 2 : this.focalLength * 2;

        // Ray 1: Parallel to axis → reflects through focus
        this.createRay(
            [{ x: objX, y: objY }, { x: 0, y: objY }],
            0x00ff88
        );

        // Reflected ray: from mirror through focus
        if (this.mirrorType === 'concave') {
            const p0 = { x: 0, y: objY }, p1 = { x: fX * 2, y: -objY };
            this.createRay([p0, p1], 0x00ff88);
            this.recordImageRay(p0, p1);
        } else {
            // Convex: ray diverges as if from virtual focus behind mirror
            const p0 = { x: 0, y: objY }, p1 = { x: objX + 5, y: objY + (objY / Math.abs(objX)) * 5 };
            this.createRay([p0, p1], 0x00ff88);
            this.recordImageRay(p0, p1);
        }

        // Ray 2: Through center (or towards center) → reflects back on itself
        this.createRay(
            [{ x: objX, y: objY }, { x: 0, y: 0 }],
            0xff00ff
        );

        if (this.mirrorType === 'concave') {
            const p0 = { x: 0, y: 0 }, p1 = { x: cX + 5, y: -objY * (cX + 5) / cX };
            this.createRay([p0, p1], 0xff00ff);
            this.recordImageRay(p0, p1);
        } else {
            // Convex: this ray is aimed at the (virtual) center of curvature behind the
            // mirror, so it strikes the surface head-on and reflects straight back along
            // the same line, appearing to come from that same virtual center.
            const slope = objY / objX;
            const p0 = { x: 0, y: 0 }, p1 = { x: cX, y: slope * cX };
            this.createRay([p0, p1], 0xff00ff);
            this.recordImageRay(p0, p1);
        }

        // Ray 3: Towards focus → reflects parallel
        if (this.mirrorType === 'concave') {
            const slope = (objY - 0) / (objX - fX);
            const mirrorY = slope * (0 - fX);
            this.createRay(
                [{ x: objX, y: objY }, { x: 0, y: mirrorY }],
                0xffff00
            );
            const p0 = { x: 0, y: mirrorY }, p1 = { x: objX + 10, y: mirrorY };
            this.createRay([p0, p1], 0xffff00);
            this.recordImageRay(p0, p1);
        }

        this.finalizeImageMarker();
    }

    createRay(points, color) {
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });

        const vertices = points.map(p => new THREE.Vector3(p.x, p.y, 0.05));
        const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.rays.push(line);

        // Add arrow indicator at end
        const lastPoint = vertices[vertices.length - 1];
        const prevPoint = vertices[vertices.length - 2];
        const dir = new THREE.Vector3().subVectors(lastPoint, prevPoint).normalize();

        const arrowGeom = new THREE.ConeGeometry(0.12, 0.3, 8);
        const arrowMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
        const arrow = new THREE.Mesh(arrowGeom, arrowMat);
        arrow.position.copy(lastPoint);
        arrow.rotation.z = -Math.atan2(dir.y, dir.x) - Math.PI / 2;
        this.scene.add(arrow);
        this.rays.push(arrow);
    }

    setMirrorType(type) {
        this.mirrorType = type;
        this.setupMirrorScene();
    }

    setObjectPosition(x, y) {
        this.objectPos = { x, y };
        this.createObject();
        this.updateRays();
    }
}

// ==================== LENS SCENE ====================

class LensScene extends OpticsLab {
    constructor(containerId) {
        super(containerId);
        this.lensType = 'convex';
        this.objectPos = { x: -7, y: 2 };
        this.focalLength = 3;
        this.showRays = true;
        this.refractiveIndex = 1.5;
        this.setupLensScene();
    }

    setupLensScene() {
        this.clearObjects();
        this.createLens();
        this.createObject();
        this.createOpticalAxis();
        this.updateRays();
    }

    createLens() {
        const oldLens = this.scene.getObjectByName('lens');
        if (oldLens) this.scene.remove(oldLens);

        const lensGroup = new THREE.Group();
        lensGroup.name = 'lens';

        const height = 5;
        const thickness = this.lensType === 'convex' ? 0.6 : 0.3;

        // Create lens shape
        const shape = new THREE.Shape();
        if (this.lensType === 'convex') {
            shape.moveTo(0, -height / 2);
            shape.quadraticCurveTo(thickness, 0, 0, height / 2);
            shape.quadraticCurveTo(-thickness, 0, 0, -height / 2);
        } else {
            shape.moveTo(0, -height / 2);
            shape.quadraticCurveTo(-thickness, 0, 0, height / 2);
            shape.quadraticCurveTo(thickness, 0, 0, -height / 2);
        }

        const extrudeSettings = { depth: 0.1, bevelEnabled: false };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshPhongMaterial({
            color: 0x88ddff,
            transparent: true,
            opacity: 0.35,
            side: THREE.DoubleSide,
            emissive: 0x004466,
            emissiveIntensity: 0.2
        });

        const lens = new THREE.Mesh(geometry, material);
        lens.rotation.y = Math.PI / 2;
        lens.position.set(0, height / 2, 0);
        lensGroup.add(lens);

        // Edge glow
        const edgeGeom = new THREE.RingGeometry(height / 2 - 0.1, height / 2, 32);
        const edgeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
        const edge = new THREE.Mesh(edgeGeom, edgeMat);
        edge.position.set(0, height / 2, 0);
        edge.rotation.y = Math.PI / 2;
        lensGroup.add(edge);

        this.scene.add(lensGroup);
        this.createFocusPoints();
    }

    createFocusPoints() {
        // Clear old
        ['focusF', 'focusF2'].forEach(name => {
            const obj = this.scene.getObjectByName(name);
            if (obj) this.scene.remove(obj);
        });

        // Focal points on both sides
        [{ x: -this.focalLength, name: 'focusF' }, { x: this.focalLength, name: 'focusF2' }].forEach(fp => {
            const geom = new THREE.SphereGeometry(0.2, 16, 16);
            const mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
            const sphere = new THREE.Mesh(geom, mat);
            sphere.position.set(fp.x, 0, 0);
            sphere.name = fp.name;
            this.scene.add(sphere);

            const glowGeom = new THREE.SphereGeometry(0.35, 16, 16);
            const glowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.15 });
            const glow = new THREE.Mesh(glowGeom, glowMat);
            glow.position.set(fp.x, 0, 0);
            this.scene.add(glow);
        });
    }

    createOpticalAxis() {
        const oldAxis = this.scene.getObjectByName('opticalAxis');
        if (oldAxis) this.scene.remove(oldAxis);

        const material = new THREE.LineBasicMaterial({ color: 0x333366, transparent: true, opacity: 0.5 });
        const points = [new THREE.Vector3(-15, 0, 0), new THREE.Vector3(15, 0, 0)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        line.name = 'opticalAxis';
        this.scene.add(line);
    }

    createObject() {
        const oldObj = this.scene.getObjectByName('object3d');
        if (oldObj) this.scene.remove(oldObj);

        const objGroup = new THREE.Group();
        objGroup.name = 'object3d';

        const bodyGeom = new THREE.CylinderGeometry(0.08, 0.08, this.objectPos.y, 8);
        const bodyMat = new THREE.MeshPhongMaterial({ color: 0xff6b35, emissive: 0x331100 });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        body.position.y = this.objectPos.y / 2;
        objGroup.add(body);

        const headGeom = new THREE.ConeGeometry(0.2, 0.4, 8);
        const headMat = new THREE.MeshPhongMaterial({ color: 0xff3333, emissive: 0x330000 });
        const head = new THREE.Mesh(headGeom, headMat);
        head.position.y = this.objectPos.y + 0.2;
        objGroup.add(head);

        objGroup.position.set(this.objectPos.x, 0, 0);
        this.scene.add(objGroup);
        this.objects.push(objGroup);
    }

    updateRays() {
        this.rays.forEach(ray => this.scene.remove(ray));
        this.rays = [];

        if (!this.showRays) return;

        this.beginImageTracking();

        const objX = this.objectPos.x;
        const objY = this.objectPos.y;
        const fLen = this.focalLength;

        if (this.lensType === 'convex') {
            // Ray 1: Parallel → through F2
            this.createRay([{ x: objX, y: objY }, { x: 0, y: objY }], 0x00ff88);
            const slope1 = (0 - objY) / (fLen - 0);
            const p0a = { x: 0, y: objY }, p1a = { x: fLen + 5, y: objY + slope1 * (fLen + 5) };
            this.createRay([p0a, p1a], 0x00ff88);
            this.recordImageRay(p0a, p1a);

            // Ray 2: Through center → straight
            const p0b = { x: objX, y: objY }, p1b = { x: objX + 20, y: objY - (objY / objX) * 20 };
            this.createRay([p0b, p1b], 0xff00ff);
            this.recordImageRay(p0b, p1b);

            // Ray 3: Through F1 → parallel
            const slope3 = (objY - 0) / (objX - (-fLen));
            const hitY = slope3 * (0 - (-fLen));
            this.createRay([{ x: objX, y: objY }, { x: 0, y: hitY }], 0xffff00);
            const p0c = { x: 0, y: hitY }, p1c = { x: 15, y: hitY };
            this.createRay([p0c, p1c], 0xffff00);
            this.recordImageRay(p0c, p1c);
        } else {
            // Concave lens - diverging rays, as if from a virtual focus in front of the lens
            this.createRay([{ x: objX, y: objY }, { x: 0, y: objY }], 0x00ff88);
            const p0a = { x: 0, y: objY }, p1a = { x: 10, y: objY * 1.5 };
            this.createRay([p0a, p1a], 0x00ff88);
            this.recordImageRay(p0a, p1a);

            const p0b = { x: objX, y: objY }, p1b = { x: objX + 20, y: objY - (objY / objX) * 20 };
            this.createRay([p0b, p1b], 0xff00ff);
            this.recordImageRay(p0b, p1b);
        }

        this.finalizeImageMarker();
    }

    createRay(points, color) {
        const material = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
        const vertices = points.map(p => new THREE.Vector3(p.x, p.y, 0.05));
        const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.rays.push(line);

        const lastPoint = vertices[vertices.length - 1];
        const prevPoint = vertices[vertices.length - 2];
        const dir = new THREE.Vector3().subVectors(lastPoint, prevPoint).normalize();
        const arrowGeom = new THREE.ConeGeometry(0.12, 0.3, 8);
        const arrowMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
        const arrow = new THREE.Mesh(arrowGeom, arrowMat);
        arrow.position.copy(lastPoint);
        arrow.rotation.z = -Math.atan2(dir.y, dir.x) - Math.PI / 2;
        this.scene.add(arrow);
        this.rays.push(arrow);
    }

    setLensType(type) {
        this.lensType = type;
        this.setupLensScene();
    }

    setObjectPosition(x, y) {
        this.objectPos = { x, y };
        this.createObject();
        this.updateRays();
    }
}

// ==================== UI CONTROLLER ====================

class AppController {
    constructor() {
        this.mirrorLab = null;
        this.lensLab = null;
        this.currentQuizData = null;
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.quizAnswered = false;
        this.timer = null;
        this.timeLeft = 0;
    }

    init() {
        this.showSplash();
        this.bindEvents();
    }

    // ---- Splash Screen ----
    showSplash() {
        const splash = document.getElementById('splash-screen');
        const bar = document.querySelector('.splash-loader-bar');
        const status = document.querySelector('.splash-status');

        const stages = [
            { pct: 15, text: 'Initializing 3D Engine...' },
            { pct: 35, text: 'Loading optics models...' },
            { pct: 55, text: 'Calibrating ray tracing...' },
            { pct: 75, text: 'Preparing interactive lab...' },
            { pct: 90, text: 'Loading quiz database...' },
            { pct: 100, text: 'Ready!' }
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < stages.length) {
                bar.style.width = stages[i].pct + '%';
                status.textContent = stages[i].text;
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    splash.classList.add('hidden');
                }, 500);
            }
        }, 400);
    }

    // ---- Event Binding ----
    bindEvents() {
        // Hero buttons
        document.getElementById('btn-start')?.addEventListener('click', () => this.showSection('modules'));
        document.getElementById('btn-explore')?.addEventListener('click', () => this.showSection('modules'));

        // Navigation
        document.querySelectorAll('[data-nav]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showSection(e.target.dataset.nav);
            });
        });

        // Module cards
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', () => {
                const module = card.dataset.module;
                if (module) this.startModule(module);
            });
        });
    }

    // ---- Section Navigation ----
    showSection(section) {
        document.querySelectorAll('.app-section').forEach(s => {
            s.classList.add('section-hidden');
            s.classList.remove('section-visible');
        });

        const target = document.getElementById(`section-${section}`);
        if (target) {
            target.classList.remove('section-hidden');
            target.classList.add('section-visible');
            AppState.currentSection = section;
        }

        // Initialize 3D scenes when lab section becomes visible
        if (section === 'lab-mirror') {
            if (!this.mirrorLab) {
                setTimeout(() => {
                    this.mirrorLab = new MirrorScene('mirror-3d');
                    this.setupMirrorControls();
                }, 200);
            } else {
                // Re-render existing scene
                setTimeout(() => this.mirrorLab.onResize(), 100);
            }
        }

        if (section === 'lab-lens') {
            if (!this.lensLab) {
                setTimeout(() => {
                    this.lensLab = new LensScene('lens-3d');
                    this.setupLensControls();
                }, 200);
            } else {
                setTimeout(() => this.lensLab.onResize(), 100);
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ---- Module Management ----
    startModule(moduleId) {
        AppState.currentModule = moduleId;

        switch (moduleId) {
            case 'reflection':
                this.showSection('lab-mirror');
                this.updateSidebarInfo('mirror');
                break;
            case 'refraction':
                this.showSection('lab-lens');
                this.updateSidebarInfo('lens');
                break;
            case 'advanced':
                this.showSection('lab-lens');
                this.updateSidebarInfo('advanced');
                break;
            case 'quiz-reflection':
                this.startQuiz('reflection');
                break;
            case 'quiz-refraction':
                this.startQuiz('refraction');
                break;
            case 'quiz-advanced':
                this.startQuiz('advanced');
                break;
        }
    }

    updateSidebarInfo(type) {
        const infoBox = document.getElementById('sidebar-info');
        if (!infoBox) return;

        // Also update lens sidebar if it exists
        const lensInfoBox = document.getElementById('sidebar-info-lens');
        if (lensInfoBox && (type === 'lens' || type === 'advanced')) {
            const lensContent = type === 'advanced' ? `
                <h5>🧪 Advanced Optics</h5>
                <p>Explore <strong>Total Internal Reflection</strong> and lens power:</p>
                <div class="formula">P = 1/f (in meters)</div>
                <div class="formula">θc = sin⁻¹(1/n)</div>
                <br>
                <p><strong>Fun fact:</strong> Diamond's sparkle comes from TIR — its critical angle is only ~24.4°!</p>
            ` : `
                <h5>🔍 Convex & Concave Lenses</h5>
                <p>Lenses refract light according to <strong>Snell's Law</strong>:</p>
                <div class="formula">n₁ sin θ₁ = n₂ sin θ₂</div>
                <p>Lens formula:</p>
                <div class="formula">1/v - 1/u = 1/f</div>
                <br>
                <p><strong>Try this:</strong> Drag the object to see real-time image formation.</p>
            `;
            lensInfoBox.innerHTML = lensContent;
        }

        const content = {
            mirror: `
                <h5>🪞 Plane & Curved Mirrors</h5>
                <p>Mirrors reflect light according to the <strong>Law of Reflection</strong>:</p>
                <div class="formula">θᵢ = θᵣ</div>
                <p>Where θᵢ is the angle of incidence and θᵣ is the angle of reflection, both measured from the normal.</p>
                <br>
                <p><strong>Try this:</strong> Drag the object up and down to see how the reflected rays change. Toggle between concave, convex, and plane mirrors.</p>
            `,
            lens: `
                <h5>🔍 Convex & Concave Lenses</h5>
                <p>Lenses refract light according to <strong>Snell's Law</strong>:</p>
                <div class="formula">n₁ sin θ₁ = n₂ sin θ₂</div>
                <p>The lens formula relates object distance (u), image distance (v), and focal length (f):</p>
                <div class="formula">1/v - 1/u = 1/f</div>
                <br>
                <p><strong>Try this:</strong> Drag the object to see real-time image formation. Notice how convex lenses converge light while concave lenses diverge it.</p>
            `,
            advanced: `
                <h5>🧪 Advanced Optics Concepts</h5>
                <p>Explore advanced phenomena like <strong>Total Internal Reflection</strong>, <strong>critical angle</strong>, and <strong>lens power</strong>:</p>
                <div class="formula">θc = sin⁻¹(1/n)</div>
                <div class="formula">P = 1/f (in meters)</div>
                <br>
                <p><strong>Key insight:</strong> Diamond's sparkle (n=2.42) is due to its very small critical angle (~24.4°), causing multiple total internal reflections.</p>
            `
        };

        infoBox.innerHTML = content[type] || '';
    }

    // ---- Mirror Controls ----
    setupMirrorControls() {
        // Mirror type toggle
        document.querySelectorAll('.mirror-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mirror-type-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.mirrorLab.setMirrorType(e.target.dataset.type);
            });
        });

        // Object position slider
        const posSlider = document.getElementById('mirror-object-pos');
        if (posSlider) {
            posSlider.addEventListener('input', (e) => {
                const x = parseFloat(e.target.value);
                this.mirrorLab.setObjectPosition(x, this.mirrorLab.objectPos.y);
                document.getElementById('mirror-pos-value').textContent = `${x.toFixed(1)} units`;
            });
        }

        // Object height slider
        const heightSlider = document.getElementById('mirror-object-height');
        if (heightSlider) {
            heightSlider.addEventListener('input', (e) => {
                const h = parseFloat(e.target.value);
                this.mirrorLab.setObjectPosition(this.mirrorLab.objectPos.x, h);
                document.getElementById('mirror-height-value').textContent = `${h.toFixed(1)} units`;
            });
        }

        // Toggle rays
        const rayToggle = document.getElementById('mirror-toggle-rays');
        if (rayToggle) {
            rayToggle.addEventListener('click', () => {
                this.mirrorLab.showRays = !this.mirrorLab.showRays;
                this.mirrorLab.updateRays();
                rayToggle.textContent = this.mirrorLab.showRays ? '💡 Hide Rays' : '💡 Show Rays';
                rayToggle.classList.toggle('active', this.mirrorLab.showRays);
            });
        }

        // Reset button
        document.getElementById('mirror-reset')?.addEventListener('click', () => {
            this.mirrorLab.setObjectPosition(-6, 2);
            if (posSlider) posSlider.value = -6;
            if (heightSlider) heightSlider.value = 2;
        });

        // Proceed to quiz
        document.getElementById('mirror-quiz-btn')?.addEventListener('click', () => {
            this.startQuiz('reflection');
        });
    }

    // ---- Lens Controls ----
    setupLensControls() {
        document.querySelectorAll('.lens-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.lens-type-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.lensLab.setLensType(e.target.dataset.type);
            });
        });

        const posSlider = document.getElementById('lens-object-pos');
        if (posSlider) {
            posSlider.addEventListener('input', (e) => {
                const x = parseFloat(e.target.value);
                this.lensLab.setObjectPosition(x, this.lensLab.objectPos.y);
                document.getElementById('lens-pos-value').textContent = `${x.toFixed(1)} units`;
            });
        }

        const heightSlider = document.getElementById('lens-object-height');
        if (heightSlider) {
            heightSlider.addEventListener('input', (e) => {
                const h = parseFloat(e.target.value);
                this.lensLab.setObjectPosition(this.lensLab.objectPos.x, h);
                document.getElementById('lens-height-value').textContent = `${h.toFixed(1)} units`;
            });
        }

        const rayToggle = document.getElementById('lens-toggle-rays');
        if (rayToggle) {
            rayToggle.addEventListener('click', () => {
                this.lensLab.showRays = !this.lensLab.showRays;
                this.lensLab.updateRays();
                rayToggle.textContent = this.lensLab.showRays ? '💡 Hide Rays' : '💡 Show Rays';
            });
        }

        document.getElementById('lens-reset')?.addEventListener('click', () => {
            this.lensLab.setObjectPosition(-7, 2);
            if (posSlider) posSlider.value = -7;
            if (heightSlider) heightSlider.value = 2;
        });

        document.getElementById('lens-quiz-btn')?.addEventListener('click', () => {
            this.startQuiz('refraction');
        });
    }

    // ---- Quiz System ----
    startQuiz(quizId) {
        AppState.currentQuiz = quizId;
        this.currentQuizData = QuizDatabase[quizId];
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.quizAnswered = false;

        this.showSection('quiz');
        this.renderQuestion();
    }

    renderQuestion() {
        const q = this.currentQuizData.questions[this.currentQuestionIndex];
        const total = this.currentQuizData.questions.length;

        document.getElementById('quiz-title').textContent = this.currentQuizData.title;
        document.getElementById('quiz-progress-text').textContent = `Question ${this.currentQuestionIndex + 1} of ${total}`;
        document.getElementById('quiz-question-text').textContent = q.question;

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
            div.addEventListener('click', () => this.selectOption(i, div));
            optionsContainer.appendChild(div);
        });

        // Hide explanation
        const explanation = document.getElementById('quiz-explanation');
        explanation.classList.remove('visible');
        explanation.textContent = '';

        // Update buttons
        document.getElementById('quiz-next-btn').style.display = 'none';
        document.getElementById('quiz-submit-btn').style.display = 'inline-flex';

        // Update progress bar
        const pct = (this.currentQuestionIndex / total) * 100;
        document.getElementById('quiz-progress-fill').style.width = pct + '%';

        this.quizAnswered = false;
    }

    selectOption(index, element) {
        if (this.quizAnswered) return;

        // Clear previous selection
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');

        // Auto-submit after selection
        this.quizAnswered = true;
        const q = this.currentQuizData.questions[this.currentQuestionIndex];

        // Mark correct/incorrect
        document.querySelectorAll('.quiz-option').forEach((opt, i) => {
            if (i === q.correct) {
                opt.classList.add('correct');
            } else if (i === index && index !== q.correct) {
                opt.classList.add('incorrect');
            }
        });

        if (index === q.correct) {
            this.quizScore++;
            this.showToast('✅', 'Correct! Well done!');
        } else {
            this.showToast('❌', 'Not quite. Check the explanation below.');
        }

        // Show explanation
        const explanation = document.getElementById('quiz-explanation');
        explanation.textContent = q.explanation;
        explanation.classList.add('visible');

        // Show next button
        document.getElementById('quiz-submit-btn').style.display = 'none';
        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.style.display = 'inline-flex';

        if (this.currentQuestionIndex === this.currentQuizData.questions.length - 1) {
            nextBtn.textContent = '🏆 See Results';
        } else {
            nextBtn.textContent = 'Next Question →';
        }

        nextBtn.onclick = () => {
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex >= this.currentQuizData.questions.length) {
                this.showQuizResults();
            } else {
                this.renderQuestion();
            }
        };
    }

    showQuizResults() {
        const total = this.currentQuizData.questions.length;
        const pct = Math.round((this.quizScore / total) * 100);
        const stars = pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;

        AppState.score = this.quizScore;
        AppState.totalScore = total;
        AppState.stars = stars;

        // Update overall progress
        if (!AppState.completedModules.includes(AppState.currentQuiz)) {
            AppState.completedModules.push(AppState.currentQuiz);
        }
        AppState.moduleScores[AppState.currentQuiz] = { score: this.quizScore, total, pct, stars };

        this.showSection('results');

        // Animate score
        const scoreEl = document.getElementById('results-score-value');
        this.animateNumber(scoreEl, 0, pct, 1500);

        // Stars
        const starsEl = document.getElementById('results-stars');
        starsEl.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = i < stars ? '⭐' : '☆';
            star.style.opacity = i < stars ? '1' : '0.3';
            star.style.animationDelay = `${i * 0.2}s`;
            starsEl.appendChild(star);
        }

        // Title based on score
        const titles = {
            5: '🏆 Optics Master!',
            4: '🌟 Excellent Work!',
            3: '👍 Good Job!',
            2: '📚 Keep Learning!',
            1: '💪 Try Again!'
        };
        document.getElementById('results-title').textContent = titles[stars];
        document.getElementById('results-subtitle').textContent =
            `You scored ${this.quizScore}/${total} in ${this.currentQuizData.title}`;

        // Stats
        document.getElementById('stat-correct').textContent = this.quizScore;
        document.getElementById('stat-incorrect').textContent = total - this.quizScore;
        document.getElementById('stat-percentage').textContent = pct + '%';

        // Update nav stats
        this.updateNavStats();

        // Check if all quizzes completed
        const allDone = ['reflection', 'refraction'].every(q => AppState.completedModules.includes(q));
        if (allDone && !AppState.completedModules.includes('certificate-ready')) {
            AppState.completedModules.push('certificate-ready');
        }
    }

    animateNumber(el, start, end, duration) {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + (end - start) * eased) + '%';
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    updateNavStats() {
        document.getElementById('nav-stars').textContent = Object.values(AppState.moduleScores).reduce((sum, m) => sum + m.stars, 0);
        document.getElementById('nav-modules').textContent = AppState.completedModules.filter(m => !m.startsWith('quiz-') && m !== 'certificate-ready').length;

        const totalPct = AppState.completedModules.filter(m => ['reflection', 'refraction', 'advanced'].includes(m)).length;
        document.getElementById('nav-progress-fill').style.width = `${(totalPct / 3) * 100}%`;
    }

    // ---- Certificate ----
    showCertificate() {
        const overlay = document.getElementById('certificate-overlay');
        overlay.classList.add('visible');

        document.getElementById('cert-name').textContent = AppState.playerName;
        document.getElementById('cert-date').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('cert-score').textContent =
            `${AppState.score}/${AppState.totalScore}`;

        const totalStars = Object.values(AppState.moduleScores).reduce((sum, m) => sum + m.stars, 0);
        document.getElementById('cert-stars').textContent = '⭐'.repeat(Math.min(totalStars, 15));

        document.getElementById('cert-close')?.addEventListener('click', () => {
            overlay.classList.remove('visible');
        });
    }

    // ---- Toast Notifications ----
    showToast(icon, message) {
        const toast = document.getElementById('toast');
        toast.querySelector('.toast-icon').textContent = icon;
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    }
}

// ==================== INITIALIZATION ====================
const app = new AppController();
document.addEventListener('DOMContentLoaded', () => app.init());

// Make app globally accessible for button onclick handlers
window.app = app;
