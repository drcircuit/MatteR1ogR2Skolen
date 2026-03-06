import type { Course } from '@/types'

export const r2Course: Course = {
  id: 'r2',
  title: 'Matematikk R2',
  description: 'Matematikk R2 for norsk videregående skole. Dekker avanserte funksjoner, derivasjon/integrasjon, vektorer i rommet, komplekse tall, kombinatorikk og lineær algebra.',
  modules: [
    // ─── Modul 1: Funksjoner ──────────────────────────────────────────────────
    {
      id: 'r2-m1',
      courseId: 'r2',
      title: 'Funksjoner',
      description: 'Sammensatte funksjoner, inverse funksjoner og periodiske funksjoner.',
      order: 1,
      competenceGoals: [
        {
          id: 'r2-km1',
          number: 1,
          text: 'utforske egenskaper ved ulike rekker og gjøre rede for praktiske anvendelser av egenskaper ved rekker',
          courseId: 'r2',
        },
        {
          id: 'r2-km2',
          number: 2,
          text: 'utforske rekursive sammenhenger ved å bruke programmering og presentere egne framgangsmåter',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m1-l1',
          moduleId: 'r2-m1',
          title: 'Sammensatte og inverse funksjoner',
          estimatedMinutes: 40,
          order: 1,
          learningGoals: [
            'Definere og beregne sammensatte funksjoner',
            'Finne den inverse funksjonen',
            'Kjenne til egenskapene til inverse funksjoner',
          ],
          content: `## Sammensatte og inverse funksjoner

### Sammensatt funksjon

Den sammensatte funksjonen $f \\circ g$ er definert som:

$$(f \\circ g)(x) = f(g(x))$$

**Eksempel:** La $f(x) = x^2$ og $g(x) = 2x + 1$. Da er:

$$(f \\circ g)(x) = f(g(x)) = f(2x+1) = (2x+1)^2 = 4x^2 + 4x + 1$$
$$(g \\circ f)(x) = g(f(x)) = g(x^2) = 2x^2 + 1$$

Merk: $f \\circ g \\neq g \\circ f$ generelt (komposisjon er ikke kommutativ).

### Invers funksjon

Funksjonen $f^{-1}$ er den inverse til $f$ hvis:

$$f(f^{-1}(x)) = x \\quad \\text{og} \\quad f^{-1}(f(x)) = x$$

En funksjon har en invers hvis og bare hvis den er **bijektiv** (én-til-én og surjektiv).

### Finne inversefunksjonen

1. Skriv $y = f(x)$
2. Løs for $x$ som funksjon av $y$
3. Bytt om $x$ og $y$

**Eksempel:** Finn $f^{-1}(x)$ for $f(x) = 3x - 2$

$$y = 3x - 2 \\Rightarrow x = \\frac{y+2}{3} \\Rightarrow f^{-1}(x) = \\frac{x+2}{3}$$

**Grafisk:** Grafen til $f^{-1}$ er speiling av grafen til $f$ om linjen $y = x$.

### Viktige inversepar

| $f(x)$ | $f^{-1}(x)$ | Betingelse |
|--------|------------|------------|
| $e^x$ | $\\ln x$ | $x > 0$ |
| $\\ln x$ | $e^x$ | $x \\in \\mathbb{R}$ |
| $x^2$ | $\\sqrt{x}$ | $x \\geq 0$, $f$ begrenset til $[0,\\infty)$ |
| $\\sin x$ | $\\arcsin x$ | $x \\in [-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ |
`,
        },
        {
          id: 'r2-m1-l2',
          moduleId: 'r2-m1',
          title: 'Periodiske funksjoner og trigonometriske identiteter',
          estimatedMinutes: 45,
          order: 2,
          learningGoals: [
            'Forstå periodiske funksjoner',
            'Kjenne til og anvende trigonometriske identiteter',
            'Utlede og bruke addisjon og dobbeltvinkelformler',
          ],
          content: `## Periodiske funksjoner og trigonometriske identiteter

### Periodisk funksjon

En funksjon er **periodisk** med periode $T$ hvis $f(x + T) = f(x)$ for alle $x$.

- $\\sin x$ og $\\cos x$ har periode $2\\pi$
- $\\tan x$ har periode $\\pi$

Generelt: $f(x) = A \\sin(bx + c) + d$ har:
- Amplitude: $|A|$
- Periode: $T = \\frac{2\\pi}{|b|}$
- Faseforskyvning: $-\\frac{c}{b}$
- Vertikal forskyvning: $d$

### Grunnleggende trigonometriske identiteter

$$\\sin^2 x + \\cos^2 x = 1$$
$$\\tan x = \\frac{\\sin x}{\\cos x}$$
$$1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$$

### Addisjonsformler

$$\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b$$
$$\\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b$$
$$\\tan(a \\pm b) = \\frac{\\tan a \\pm \\tan b}{1 \\mp \\tan a \\tan b}$$

### Dobbeltvinkelformler

$$\\sin 2a = 2 \\sin a \\cos a$$
$$\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$$

### Eksempel

Bevis at $\\cos 2x = 1 - 2\\sin^2 x$:

$$\\cos 2x = \\cos(x+x) = \\cos^2 x - \\sin^2 x = (1 - \\sin^2 x) - \\sin^2 x = 1 - 2\\sin^2 x$$
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m1-e1',
          moduleId: 'r2-m1',
          type: 'multiple-choice',
          question: 'La $f(x) = 2x + 3$ og $g(x) = x^2$. Hva er $(f \\circ g)(2)$?',
          options: ['7', '11', '49', '25'],
          correctIndex: 1,
          hint: 'Beregn først $g(2)$, deretter $f(g(2))$.',
          explanation: '$g(2) = 4$, $f(4) = 2(4) + 3 = 11$.',
          difficulty: 'lett',
        },
        {
          id: 'r2-m1-e2',
          moduleId: 'r2-m1',
          type: 'multiple-choice',
          question: 'Hva er den inverse til $f(x) = \\frac{x-1}{2}$?',
          options: ['$f^{-1}(x) = 2x - 1$', '$f^{-1}(x) = 2x + 1$', '$f^{-1}(x) = \\frac{x+1}{2}$', '$f^{-1}(x) = \\frac{1}{2x-1}$'],
          correctIndex: 1,
          hint: 'Løs $y = \\frac{x-1}{2}$ for $x$.',
          explanation: '$y = \\frac{x-1}{2} \\Rightarrow 2y = x - 1 \\Rightarrow x = 2y + 1$. Altså $f^{-1}(x) = 2x + 1$.',
          difficulty: 'middels',
        },
        {
          id: 'r2-m1-e3',
          moduleId: 'r2-m1',
          type: 'multiple-choice',
          question: 'Hva er perioden til $f(x) = 3\\sin(4x - 1)$?',
          options: ['$4\\pi$', '$\\frac{\\pi}{2}$', '$2\\pi$', '$\\frac{\\pi}{4}$'],
          correctIndex: 1,
          hint: 'Perioden er $T = \\frac{2\\pi}{|b|}$ der $b$ er koeffisienten foran $x$.',
          explanation: '$T = \\frac{2\\pi}{4} = \\frac{\\pi}{2}$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r2-m1-quiz',
        moduleId: 'r2-m1',
        title: 'Quiz: Funksjoner',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m1-q1',
            moduleId: 'r2-m1',
            type: 'multiple-choice',
            question: 'Hva er $(g \\circ f)(x)$ når $f(x) = x + 2$ og $g(x) = x^2 - 1$?',
            options: ['$(x+2)^2 - 1$', '$x^2 + 1$', '$x^2 - 1 + 2$', '$(x-1)^2 + 2$'],
            correctIndex: 0,
            explanation: '$(g \\circ f)(x) = g(f(x)) = g(x+2) = (x+2)^2 - 1$.',
            difficulty: 'middels',
          },
          {
            id: 'r2-m1-q2',
            moduleId: 'r2-m1',
            type: 'multiple-choice',
            question: 'Hva er $\\sin 75° = \\sin(45° + 30°)$?',
            options: ['$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} + 1}{4}$', '$\\frac{1}{2}$'],
            correctIndex: 0,
            explanation: '$\\sin(45° + 30°) = \\sin 45°\\cos 30° + \\cos 45°\\sin 30° = \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$.',
            difficulty: 'vanskelig',
          },
        ],
      },
    },

    // ─── Modul 2: Avansert derivasjon og integrasjon ───────────────────────────
    {
      id: 'r2-m2',
      courseId: 'r2',
      title: 'Avansert derivasjon og integrasjon',
      description: 'Derivasjon av trigonometriske funksjoner, delbrøkoppspalting, delvis integrasjon og differensialligninger.',
      order: 2,
      competenceGoals: [
        {
          id: 'r2-km3',
          number: 3,
          text: 'gjøre rede for integral som en grenseverdi av en følge av summer, og tolke betydningen av denne grenseverdien i ulike situasjoner',
          courseId: 'r2',
        },
        {
          id: 'r2-km4',
          number: 4,
          text: 'gjøre rede for analysens fundamentalteorem og gjøre rede for konsekvenser av teoremet',
          courseId: 'r2',
        },
        {
          id: 'r2-km5',
          number: 5,
          text: 'utvikle algoritmer for å beregne integraler numerisk, og bruke programmering til å utføre algoritmene',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m2-l1',
          moduleId: 'r2-m2',
          title: 'Avanserte derivasjonsteknikker',
          estimatedMinutes: 50,
          order: 1,
          learningGoals: [
            'Derivere trigonometriske og inverse trigonometriske funksjoner',
            'Bruke implisitt derivasjon',
            'Derivere parametriske kurver',
          ],
          content: `## Avanserte derivasjonsteknikker

### Derivasjon av trigonometriske funksjoner

| $f(x)$ | $f'(x)$ |
|--------|---------|
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |
| $\\tan x$ | $\\frac{1}{\\cos^2 x} = 1 + \\tan^2 x$ |
| $\\arcsin x$ | $\\frac{1}{\\sqrt{1-x^2}}$ |
| $\\arccos x$ | $-\\frac{1}{\\sqrt{1-x^2}}$ |
| $\\arctan x$ | $\\frac{1}{1+x^2}$ |

### Implisitt derivasjon

Brukes når $y$ ikke er eksplisitt uttrykt som funksjon av $x$.

**Eksempel:** Finn $\\frac{dy}{dx}$ for $x^2 + y^2 = 25$

Deriver begge sider med hensyn til $x$:

$$2x + 2y \\frac{dy}{dx} = 0$$

$$\\frac{dy}{dx} = -\\frac{x}{y}$$

**Eksempel:** Finn stigningstallet til $x^3 + y^3 = 9$ i punktet $(1, 2)$:

$$3x^2 + 3y^2 \\frac{dy}{dx} = 0 \\Rightarrow \\frac{dy}{dx} = -\\frac{x^2}{y^2}$$

I $(1, 2)$: $\\frac{dy}{dx} = -\\frac{1}{4}$

### L'Hôpitals regel

For ubestemt form $\\frac{0}{0}$ eller $\\frac{\\infty}{\\infty}$:

$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$

**Eksempel:** $\\lim_{x \\to 0} \\frac{\\sin x}{x}$

$$= \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$$
`,
        },
        {
          id: 'r2-m2-l2',
          moduleId: 'r2-m2',
          title: 'Avanserte integrasjonsteknikker',
          estimatedMinutes: 55,
          order: 2,
          learningGoals: [
            'Utføre delvis integrasjon',
            'Bruke delbrøkoppspalting',
            'Løse enkle differensialligninger med separasjon av variable',
          ],
          content: `## Avanserte integrasjonsteknikker

### Delvis integrasjon

$$\\int u \\, dv = uv - \\int v \\, du$$

**Huskeregel LIATE:** Velg $u$ fra: Logaritme, Invers trig, Algebra, Trig, Eksponential

**Eksempel:** $\\int x e^x \\, dx$

La $u = x$, $dv = e^x\\,dx$. Da $du = dx$, $v = e^x$:

$$\\int x e^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x-1) + C$$

### Delbrøkoppspalting

Brukes for å integrere rasjonale funksjoner.

**Eksempel:** $\\int \\frac{1}{x^2 - 1}\\,dx$

$$\\frac{1}{x^2 - 1} = \\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1} + \\frac{B}{x+1}$$

Løser: $A = \\frac{1}{2}$, $B = -\\frac{1}{2}$

$$\\int \\frac{1}{x^2-1}\\,dx = \\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$$

### Differensialligninger – separasjon av variable

En differensialligning av typen $\\frac{dy}{dx} = f(x) g(y)$ kan løses ved separasjon:

$$\\frac{dy}{g(y)} = f(x)\\,dx$$

Integrer begge sider.

**Eksempel:** Løs $\\frac{dy}{dx} = 2xy$, $y(0) = 3$

$$\\frac{dy}{y} = 2x\\,dx$$
$$\\ln|y| = x^2 + C$$
$$y = Ae^{x^2}$$

Bruk initialbetingelsen: $y(0) = A = 3$, så $y = 3e^{x^2}$.

### Eksponentiell vekst og forfall

$$\\frac{dy}{dt} = ky \\Rightarrow y(t) = y_0 e^{kt}$$

- $k > 0$: vekst
- $k < 0$: forfall
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m2-e1',
          moduleId: 'r2-m2',
          type: 'multiple-choice',
          question: 'Hva er $\\frac{d}{dx}[\\arctan(x)]$?',
          options: ['$\\frac{1}{\\sqrt{1-x^2}}$', '$\\frac{1}{1+x^2}$', '$-\\frac{1}{1+x^2}$', '$\\frac{1}{x^2-1}$'],
          correctIndex: 1,
          hint: 'Husker du derivert av arktangens?',
          explanation: '$\\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}$.',
          difficulty: 'middels',
        },
        {
          id: 'r2-m2-e2',
          moduleId: 'r2-m2',
          type: 'multiple-choice',
          question: 'Bruk delvis integrasjon for å finne $\\int x \\sin x\\,dx$',
          options: ['$-x\\cos x - \\sin x + C$', '$-x\\cos x + \\sin x + C$', '$x\\cos x + \\sin x + C$', '$\\cos x + x\\sin x + C$'],
          correctIndex: 1,
          hint: 'La $u = x$ og $dv = \\sin x\\,dx$.',
          explanation: '$u = x$, $dv = \\sin x\\,dx$, $du = dx$, $v = -\\cos x$. $\\int x\\sin x\\,dx = -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C$.',
          difficulty: 'middels',
        },
        {
          id: 'r2-m2-e3',
          moduleId: 'r2-m2',
          type: 'multiple-choice',
          question: 'Hva er $\\lim_{x \\to 0} \\frac{\\tan x}{x}$?',
          options: ['0', '1', '$\\infty$', 'Eksisterer ikke'],
          correctIndex: 1,
          hint: 'Bruk L\'Hôpitals regel eller husker du grensen for $\\frac{\\sin x}{x}$?',
          explanation: 'L\'Hôpital: $\\lim_{x \\to 0} \\frac{\\tan x}{x} = \\lim_{x \\to 0} \\frac{1/\\cos^2 x}{1} = 1$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r2-m2-quiz',
        moduleId: 'r2-m2',
        title: 'Quiz: Avansert derivasjon og integrasjon',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m2-q1',
            moduleId: 'r2-m2',
            type: 'multiple-choice',
            question: 'Løs differensialligningen $\\frac{dy}{dx} = 3y$ med $y(0) = 2$',
            options: ['$y = 3e^{2x}$', '$y = 2e^{3x}$', '$y = 2 \\cdot 3^x$', '$y = e^{3x} + 1$'],
            correctIndex: 1,
            explanation: 'Separasjon: $y = Ae^{3x}$. $y(0) = A = 2$, så $y = 2e^{3x}$.',
            difficulty: 'middels',
          },
          {
            id: 'r2-m2-q2',
            moduleId: 'r2-m2',
            type: 'multiple-choice',
            question: 'Finn $\\frac{dy}{dx}$ for $\\sin(xy) = x$ ved implisitt derivasjon',
            options: [
              '$\\frac{1 - y\\cos(xy)}{x\\cos(xy)}$',
              '$\\frac{\\cos(xy)}{\\cos(xy)}$',
              '$\\frac{1}{\\cos(xy)}$',
              '$y\\cos(xy)$',
            ],
            correctIndex: 0,
            explanation: 'Deriver: $\\cos(xy)(y + x\\frac{dy}{dx}) = 1$, løs for $\\frac{dy}{dx}$.',
            difficulty: 'vanskelig',
          },
        ],
      },
    },

    // ─── Modul 3: Vektorer i rommet ───────────────────────────────────────────
    {
      id: 'r2-m3',
      courseId: 'r2',
      title: 'Vektorer i rommet',
      description: '3D-vektorer, kryssprodukt, linjer og plan i rommet.',
      order: 3,
      competenceGoals: [
        {
          id: 'r2-km6',
          number: 6,
          text: 'gi eksempler på ulike situasjoner som kan modelleres ved å bruke ulike matematiske funksjoner, og modellere og analysere slike situasjoner ved å bruke reelle datasett',
          courseId: 'r2',
        },
        {
          id: 'r2-km7',
          number: 7,
          text: 'anvende derivasjon og integrasjon til å analysere og tolke egne matematiske modeller av reelle datasett',
          courseId: 'r2',
        },
        {
          id: 'r2-km8',
          number: 8,
          text: 'analysere og tolke ulike funksjoner ved å bruke derivasjon og integrasjon, og anvende integrasjon til å beregne ulike mål av omdreiningslegemer',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m3-l1',
          moduleId: 'r2-m3',
          title: 'Vektorer i 3D',
          estimatedMinutes: 45,
          order: 1,
          learningGoals: [
            'Representere og manipulere 3D-vektorer',
            'Beregne skalarproduktet og kryssproduktet',
            'Finne vinkelen mellom vektorer i rommet',
          ],
          content: `## Vektorer i rommet (3D)

### Representasjon

En vektor i rommet skrives som:

$$\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{pmatrix} = v_1 \\hat{i} + v_2 \\hat{j} + v_3 \\hat{k}$$

### Lengde

$$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}$$

### Skalarproduktet

$$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}||\\vec{v}|\\cos\\theta$$

### Kryssproduktet

$$\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}$$

$$= \\begin{pmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{pmatrix}$$

Kryssproduktet er **vinkelrett** på begge $\\vec{u}$ og $\\vec{v}$.

**Geometrisk:** $|\\vec{u} \\times \\vec{v}| = |\\vec{u}||\\vec{v}|\\sin\\theta$ = arealet av parallellogrammet utspent av $\\vec{u}$ og $\\vec{v}$.

### Plan og linjer

**Ligning for et plan** med normalvektor $\\vec{n} = (a, b, c)$ gjennom punktet $P_0 = (x_0, y_0, z_0)$:

$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$

eller $ax + by + cz = d$ der $d = ax_0 + by_0 + cz_0$.

**Parameterform for en linje** gjennom $P_0$ med retningsvektor $\\vec{r}$:

$$\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} x_0 \\\\ y_0 \\\\ z_0 \\end{pmatrix} + t \\begin{pmatrix} r_1 \\\\ r_2 \\\\ r_3 \\end{pmatrix}$$
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m3-e1',
          moduleId: 'r2-m3',
          type: 'multiple-choice',
          question: 'Lengden av $\\vec{v} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 2 \\end{pmatrix}$ er:',
          options: ['3', '$\\sqrt{5}$', '$\\sqrt{9}$', '5'],
          correctIndex: 0,
          hint: '$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}$.',
          explanation: '$|\\vec{v}| = \\sqrt{4 + 1 + 4} = \\sqrt{9} = 3$.',
          difficulty: 'lett',
        },
        {
          id: 'r2-m3-e2',
          moduleId: 'r2-m3',
          type: 'multiple-choice',
          question: 'Hva er $\\vec{u} \\cdot \\vec{v}$ for $\\vec{u} = (1, 2, 3)$ og $\\vec{v} = (4, -1, 2)$?',
          options: ['8', '9', '12', '6'],
          correctIndex: 0,
          hint: 'Summer produktene av tilsvarende komponenter.',
          explanation: '$1 \\cdot 4 + 2 \\cdot (-1) + 3 \\cdot 2 = 4 - 2 + 6 = 8$.',
          difficulty: 'lett',
        },
      ],
      quiz: {
        id: 'r2-m3-quiz',
        moduleId: 'r2-m3',
        title: 'Quiz: Vektorer i rommet',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m3-q1',
            moduleId: 'r2-m3',
            type: 'multiple-choice',
            question: 'Hvilken vektor er vinkelrett på både $\\vec{i} = (1,0,0)$ og $\\vec{j} = (0,1,0)$?',
            options: ['$(1, 1, 0)$', '$(0, 0, 1)$', '$(1, 0, 1)$', '$(0, 1, 1)$'],
            correctIndex: 1,
            explanation: '$\\hat{i} \\times \\hat{j} = \\hat{k} = (0, 0, 1)$.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 4: Komplekse tall ──────────────────────────────────────────────
    {
      id: 'r2-m4',
      courseId: 'r2',
      title: 'Komplekse tall',
      description: 'Komplekse tall, polær form, Eulers formel og de Moivres teorem.',
      order: 4,
      competenceGoals: [
        {
          id: 'r2-km9',
          number: 9,
          text: 'anvende parameterframstillinger til kurver og bruke parameterframstillinger til å løse naturvitenskapelige problemer inkludert problemer knyttet til fart og akselerasjon',
          courseId: 'r2',
        },
        {
          id: 'r2-km10',
          number: 10,
          text: 'utforske og forstå regneregler for vektorer i rommet, og bruke vektorer til å beregne ulike størrelser i rommet',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m4-l1',
          moduleId: 'r2-m4',
          title: 'Introduksjon til komplekse tall',
          estimatedMinutes: 45,
          order: 1,
          learningGoals: [
            'Forstå den imaginære enheten $i$',
            'Utføre regneoperasjoner med komplekse tall',
            'Representere komplekse tall i det komplekse planet',
            'Bruke polær form og Eulers formel',
          ],
          content: `## Komplekse tall

### Den imaginære enheten

$$i = \\sqrt{-1} \\quad \\Rightarrow \\quad i^2 = -1$$

### Kartesisk form

Et komplekst tall: $z = a + bi$ der $a, b \\in \\mathbb{R}$.

- $a = \\text{Re}(z)$ er realdelen
- $b = \\text{Im}(z)$ er imaginærdelen

### Regneregler

**Addisjon:** $(a+bi) + (c+di) = (a+c) + (b+d)i$

**Multiplikasjon:** $(a+bi)(c+di) = (ac - bd) + (ad + bc)i$

**Konjugat:** $\\bar{z} = a - bi$

**Absoluttverdi (modulus):** $|z| = \\sqrt{a^2 + b^2}$

**Divisjon:**
$$\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{c^2+d^2}$$

### Polær form og Eulers formel

$$z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}$$

der $r = |z|$ og $\\theta = \\arg(z) = \\arctan\\left(\\frac{b}{a}\\right)$.

**Eulers formel:** $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$

**Spesielt:** $e^{i\\pi} + 1 = 0$ (Eulers identitet)

### de Moivres teorem

$$(r e^{i\\theta})^n = r^n e^{in\\theta} = r^n(\\cos(n\\theta) + i\\sin(n\\theta))$$

**Eksempel:** Finn $\\left(1 + i\\right)^8$

$r = \\sqrt{2}$, $\\theta = \\frac{\\pi}{4}$, så $z = \\sqrt{2}e^{i\\pi/4}$

$$z^8 = (\\sqrt{2})^8 e^{i2\\pi} = 16 \\cdot 1 = 16$$

### n-te røtter

$n$-te røttene av $z = re^{i\\theta}$ er:

$$w_k = r^{1/n} e^{i(\\theta + 2\\pi k)/n}, \\quad k = 0, 1, \\ldots, n-1$$
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m4-e1',
          moduleId: 'r2-m4',
          type: 'multiple-choice',
          question: 'Hva er $(2 + 3i)(1 - i)$?',
          options: ['$2 - 3$', '$5 - i$', '$5 + i$', '$-1 + 5i$'],
          correctIndex: 1,
          hint: 'Multipliser ut og husk $i^2 = -1$.',
          explanation: '$(2+3i)(1-i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$.',
          difficulty: 'middels',
        },
        {
          id: 'r2-m4-e2',
          moduleId: 'r2-m4',
          type: 'multiple-choice',
          question: 'Hva er $|3 + 4i|$?',
          options: ['7', '1', '5', '$\\sqrt{7}$'],
          correctIndex: 2,
          hint: '$|a + bi| = \\sqrt{a^2 + b^2}$.',
          explanation: '$|3 + 4i| = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
          difficulty: 'lett',
        },
      ],
      quiz: {
        id: 'r2-m4-quiz',
        moduleId: 'r2-m4',
        title: 'Quiz: Komplekse tall',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m4-q1',
            moduleId: 'r2-m4',
            type: 'multiple-choice',
            question: 'Hva er $i^{10}$?',
            options: ['$1$', '$-1$', '$i$', '$-i$'],
            correctIndex: 1,
            explanation: '$i^4 = 1$, $i^{10} = i^{4 \\cdot 2 + 2} = (i^4)^2 \\cdot i^2 = 1 \\cdot (-1) = -1$.',
            difficulty: 'middels',
          },
          {
            id: 'r2-m4-q2',
            moduleId: 'r2-m4',
            type: 'multiple-choice',
            question: 'Skriv $1 + i$ på polær form',
            options: ['$e^{i\\pi/4}$', '$\\sqrt{2}e^{i\\pi/4}$', '$2e^{i\\pi/4}$', '$\\sqrt{2}e^{i\\pi/2}$'],
            correctIndex: 1,
            explanation: '$r = \\sqrt{1+1} = \\sqrt{2}$, $\\theta = \\arctan(1/1) = \\pi/4$. Altså $z = \\sqrt{2}e^{i\\pi/4}$.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 5: Sannsynlighet og statistikk ─────────────────────────────────
    {
      id: 'r2-m5',
      courseId: 'r2',
      title: 'Sannsynlighet og statistikk',
      description: 'Diskrete og kontinuerlige sannsynlighetsfordelinger, binomialfordeling og normalfordeling.',
      order: 5,
      competenceGoals: [
        {
          id: 'r2-km11',
          number: 11,
          text: 'utforske egenskaper ved radianer og trigonometriske funksjoner og identiteter og anvende disse egenskapene til å løse praktiske problemer',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m5-l1',
          moduleId: 'r2-m5',
          title: 'Stokastiske variabler og fordelinger',
          estimatedMinutes: 50,
          order: 1,
          learningGoals: [
            'Forstå begrepet stokastisk variabel',
            'Beregne forventningsverdi og varians',
            'Kjenne binomialfordelingen',
            'Bruke normalfordelingen',
          ],
          content: `## Stokastiske variabler og fordelinger

### Stokastisk variabel

En **stokastisk variabel** $X$ er en variabel hvis verdi bestemmes av et tilfeldig eksperiment.

- **Diskret:** endelig eller tellbart uendelig mange verdier
- **Kontinuerlig:** verdier i et intervall

### Forventningsverdi og varians

For en **diskret** stokastisk variabel:

$$E(X) = \\mu = \\sum_x x \\cdot P(X = x)$$

$$\\text{Var}(X) = \\sigma^2 = E(X^2) - [E(X)]^2 = \\sum_x (x - \\mu)^2 P(X = x)$$

$$\\text{Standardavvik} = \\sigma = \\sqrt{\\text{Var}(X)}$$

### Binomialfordelingen

$X \\sim B(n, p)$: $n$ uavhengige forsøk, hvert med sannsynlighet $p$ for suksess.

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$

$$E(X) = np, \\quad \\text{Var}(X) = np(1-p)$$

**Eksempel:** En terning kastes 10 ganger. La $X$ = antall seksere.

$X \\sim B(10, \\frac{1}{6})$

$$P(X = 2) = \\binom{10}{2} \\left(\\frac{1}{6}\\right)^2 \\left(\\frac{5}{6}\\right)^8 \\approx 0{,}291$$

$$E(X) = 10 \\cdot \\frac{1}{6} \\approx 1{,}67$$

### Normalfordelingen

$X \\sim N(\\mu, \\sigma^2)$: Klokkeformet symmetrisk fordeling.

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

**Standardisering:** $Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)$

**68-95-99,7-regelen:**
- $P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68\\%$
- $P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 95\\%$
- $P(\\mu - 3\\sigma < X < \\mu + 3\\sigma) \\approx 99{,}7\\%$
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m5-e1',
          moduleId: 'r2-m5',
          type: 'multiple-choice',
          question: 'La $X \\sim B(5, 0{,}4)$. Hva er $E(X)$?',
          options: ['0,4', '1', '2', '2,5'],
          correctIndex: 2,
          hint: '$E(X) = np$.',
          explanation: '$E(X) = 5 \\cdot 0{,}4 = 2$.',
          difficulty: 'lett',
        },
        {
          id: 'r2-m5-e2',
          moduleId: 'r2-m5',
          type: 'multiple-choice',
          question: 'En tilfeldig variabel $X \\sim N(50, 100)$. Hva er standardavviket?',
          options: ['10', '100', '50', '$\\sqrt{50}$'],
          correctIndex: 0,
          hint: '$N(\\mu, \\sigma^2)$ der $\\sigma^2$ er variansen.',
          explanation: 'Variansen er 100, standardavviket er $\\sigma = \\sqrt{100} = 10$.',
          difficulty: 'lett',
        },
      ],
      quiz: {
        id: 'r2-m5-quiz',
        moduleId: 'r2-m5',
        title: 'Quiz: Sannsynlighet og statistikk',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m5-q1',
            moduleId: 'r2-m5',
            type: 'multiple-choice',
            question: 'Et mynt kastes 6 ganger. Sannsynligheten for nøyaktig 4 krone er:',
            options: ['$\\frac{1}{16}$', '$\\frac{15}{64}$', '$\\frac{6}{16}$', '$\\frac{1}{4}$'],
            correctIndex: 1,
            explanation: '$P(X=4) = \\binom{6}{4}(0{,}5)^4(0{,}5)^2 = 15 \\cdot \\frac{1}{64} = \\frac{15}{64}$.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 6: Lineær algebra ──────────────────────────────────────────────
    {
      id: 'r2-m6',
      courseId: 'r2',
      title: 'Lineær algebra',
      description: 'Matriser, determinanter og løsning av lineære ligningssystemer.',
      order: 6,
      competenceGoals: [
        {
          id: 'r2-km12',
          number: 12,
          text: 'analysere og forstå matematiske bevis, forklare de bærende ideene i et matematisk bevis og utvikle egne bevis',
          courseId: 'r2',
        },
      ],
      lessons: [
        {
          id: 'r2-m6-l1',
          moduleId: 'r2-m6',
          title: 'Matriser og matriseoperasjoner',
          estimatedMinutes: 50,
          order: 1,
          learningGoals: [
            'Forstå matrisebegrepet og matrisestørrelser',
            'Utføre matrise-addisjon og matrise-multiplikasjon',
            'Beregne determinanten til en 2×2-matrise',
            'Løse lineære ligningssystemer med eliminasjon og matriser',
          ],
          content: `## Matriser og matriseoperasjoner

### Definisjon

En **matrise** $A$ av størrelse $m \\times n$ er en tabell med $m$ rader og $n$ kolonner:

$$A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{pmatrix}$$

### Matriseaddisjon og skalarmultiplikasjon

Kun matriser av **samme størrelse** kan adderes (element for element).

$$(A + B)_{ij} = a_{ij} + b_{ij}$$
$$(cA)_{ij} = c \\cdot a_{ij}$$

### Matrisemultiplikasjon

For $A$ ($m \\times n$) og $B$ ($n \\times p$), er $C = AB$ en $m \\times p$-matrise:

$$c_{ij} = \\sum_{k=1}^n a_{ik} b_{kj}$$

**Merk:** Matrisemultiplikasjon er **ikke** kommutativ: $AB \\neq BA$ generelt.

**Eksempel:**

$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix} = \\begin{pmatrix} 19 & 22 \\\\ 43 & 50 \\end{pmatrix}$$

### Determinant for $2 \\times 2$-matrise

$$\\det(A) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$

### Invers matrise

$(2 \\times 2)$-matrise $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ har invers (når $\\det(A) \\neq 0$):

$$A^{-1} = \\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$

### Lineære ligningssystemer

Systemet $A\\vec{x} = \\vec{b}$ løses ved:
1. Gaussisk eliminasjon (radreduksjon)
2. Cramers regel (for kvadratiske systemer)
3. $\\vec{x} = A^{-1}\\vec{b}$ (når $A$ er inverterbar)

**Eksempel:** Løs $\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases}$

Matriseform: $\\begin{pmatrix} 2 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 1 \\end{pmatrix}$

$\\det(A) = -2 - 1 = -3$, $A^{-1} = \\frac{1}{-3}\\begin{pmatrix} -1 & -1 \\\\ -1 & 2 \\end{pmatrix}$

$x = 2$, $y = 1$
`,
        },
      ],
      exercises: [
        {
          id: 'r2-m6-e1',
          moduleId: 'r2-m6',
          type: 'multiple-choice',
          question: 'Hva er $\\det\\begin{pmatrix} 3 & 2 \\\\ 1 & 4 \\end{pmatrix}$?',
          options: ['8', '10', '12', '14'],
          correctIndex: 1,
          hint: '$\\det = ad - bc$.',
          explanation: '$\\det = 3 \\cdot 4 - 2 \\cdot 1 = 12 - 2 = 10$.',
          difficulty: 'lett',
        },
        {
          id: 'r2-m6-e2',
          moduleId: 'r2-m6',
          type: 'multiple-choice',
          question: 'Produktet $\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ er:',
          options: ['$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$', '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$', '$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$', '$\\begin{pmatrix} a+1 & b \\\\ c & d+1 \\end{pmatrix}$'],
          correctIndex: 1,
          hint: 'Identitetsmatrisen $I$ har egenskapen $IA = A$.',
          explanation: 'Identitetsmatrisen $I$ endrer ikke matrisen: $IA = A$.',
          difficulty: 'lett',
        },
      ],
      quiz: {
        id: 'r2-m6-quiz',
        moduleId: 'r2-m6',
        title: 'Quiz: Lineær algebra',
        passingScore: 60,
        questions: [
          {
            id: 'r2-m6-q1',
            moduleId: 'r2-m6',
            type: 'multiple-choice',
            question: 'Løs $\\begin{cases} x + y = 4 \\\\ 2x - y = 2 \\end{cases}$',
            options: ['$x = 1, y = 3$', '$x = 2, y = 2$', '$x = 3, y = 1$', '$x = 4, y = 0$'],
            correctIndex: 1,
            explanation: 'Addisjon av ligningene: $3x = 6 \\Rightarrow x = 2$. Fra første ligning: $y = 2$.',
            difficulty: 'middels',
          },
          {
            id: 'r2-m6-q2',
            moduleId: 'r2-m6',
            type: 'multiple-choice',
            question: 'Hvilken matrise er invers til $\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$?',
            options: [
              '$\\begin{pmatrix} 1 & -2 \\\\ 0 & 1 \\end{pmatrix}$',
              '$\\begin{pmatrix} 1 & 2 \\\\ 0 & -1 \\end{pmatrix}$',
              '$\\begin{pmatrix} -1 & 2 \\\\ 0 & -1 \\end{pmatrix}$',
              '$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$',
            ],
            correctIndex: 0,
            explanation: '$\\det = 1$. $A^{-1} = \\begin{pmatrix} 1 & -2 \\\\ 0 & 1 \\end{pmatrix}$. Sjekk: $A \\cdot A^{-1} = I$.',
            difficulty: 'middels',
          },
        ],
      },
    },
  ],
}
