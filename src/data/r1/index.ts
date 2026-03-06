import type { Course } from '@/types'

export const r1Course: Course = {
  id: 'r1',
  title: 'Matematikk R1',
  description: 'Matematikk R1 for norsk videregående skole. Dekker algebra, geometri, kombinatorikk, derivasjon og integrasjon.',
  modules: [
    // ─── Modul 1: Algebra og funksjoner ───────────────────────────────────────
    {
      id: 'r1-m1',
      courseId: 'r1',
      title: 'Algebra og funksjoner',
      description: 'Polynomer, rasjonale funksjoner, eksponentialfunksjoner og logaritmer.',
      order: 1,
      lessons: [
        {
          id: 'r1-m1-l1',
          moduleId: 'r1-m1',
          title: 'Polynomfunksjoner',
          estimatedMinutes: 30,
          order: 1,
          learningGoals: [
            'Kjenne til polynomers oppbygging og grad',
            'Utføre polynomdivisjon',
            'Finne nullpunkter til polynomer',
            'Skissere grafene til polynomfunksjoner',
          ],
          content: `## Polynomfunksjoner

Et **polynom** er et matematisk uttrykk på formen:

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0$$

der $a_n \\neq 0$ og $n$ er et ikke-negativt heltall kalt **graden** til polynomet.

### Eksempler

| Polynom | Grad | Ledende koeffisient |
|---------|------|---------------------|
| $P(x) = 3x^2 - 2x + 1$ | 2 | 3 |
| $Q(x) = x^3 + 4x$ | 3 | 1 |
| $R(x) = -5x^4 + x^2 - 7$ | 4 | -5 |

### Nullpunkter

Nullpunktene til $P(x)$ er de verdiene av $x$ der $P(x) = 0$.

**Eksempel:** Finn nullpunktene til $P(x) = x^2 - 5x + 6$

$$x^2 - 5x + 6 = 0$$
$$(x-2)(x-3) = 0$$
$$x = 2 \\quad \\text{eller} \\quad x = 3$$

### Polynomdivisjon

Polynomdivisjon brukes for å dele et polynom på et annet. Vi skriver:

$$P(x) = D(x) \\cdot K(x) + R(x)$$

der $D(x)$ er divisoren, $K(x)$ er kvotienten og $R(x)$ er resten.

**Eksempel:** Del $P(x) = x^3 - 2x^2 + x - 3$ på $D(x) = x - 1$

Vi bruker syntetisk divisjon eller langdivisjon. Resultatet blir:

$$x^3 - 2x^2 + x - 3 = (x-1)(x^2 - x) - 3$$

### Atferd i det uendelige

For et polynom av grad $n$ med ledende koeffisient $a_n$:
- Hvis $n$ er **partall** og $a_n > 0$: grafen går mot $+\\infty$ i begge retninger
- Hvis $n$ er **oddetall** og $a_n > 0$: grafen går mot $-\\infty$ til venstre og $+\\infty$ til høyre

### Grafskissering

For å skissere grafen til et polynom:
1. Finn nullpunktene
2. Bestem fortegnet til $P(x)$ mellom nullpunktene
3. Bruk atferden i det uendelige
4. Finn eventuelle stasjonære punkter (se derivasjon)
`,
        },
        {
          id: 'r1-m1-l2',
          moduleId: 'r1-m1',
          title: 'Rasjonale funksjoner',
          estimatedMinutes: 35,
          order: 2,
          learningGoals: [
            'Definere rasjonale funksjoner og deres definisjonsmengde',
            'Finne vertikale og horisontale asymptoter',
            'Skissere grafer til enkle rasjonale funksjoner',
          ],
          content: `## Rasjonale funksjoner

En **rasjonal funksjon** er en funksjon av formen:

$$f(x) = \\frac{P(x)}{Q(x)}$$

der $P(x)$ og $Q(x)$ er polynomer og $Q(x) \\neq 0$.

### Definisjonsmengde

Definisjonsmengden er alle reelle tall unntatt de verdiene der $Q(x) = 0$.

**Eksempel:** $f(x) = \\dfrac{x+1}{x-2}$

Her er $Q(x) = x - 2 = 0$ når $x = 2$, så $D_f = \\mathbb{R} \\setminus \\{2\\}$.

### Vertikale asymptoter

Der $Q(x) = 0$ (og $P(x) \\neq 0$) har grafen en **vertikal asymptote**.

For $f(x) = \\dfrac{x+1}{x-2}$ er det en vertikal asymptote ved $x = 2$.

### Horisontale asymptoter

La graden til $P(x)$ være $m$ og graden til $Q(x)$ være $n$:

| Tilfelle | Horisontal asymptote |
|----------|----------------------|
| $m < n$ | $y = 0$ |
| $m = n$ | $y = \\dfrac{a_m}{b_n}$ (forholdet mellom ledende koeffisienter) |
| $m > n$ | Ingen horisontal asymptote |

**Eksempel:** $f(x) = \\dfrac{3x^2 - 1}{2x^2 + 5}$

Her er $m = n = 2$, så den horisontale asymptoten er $y = \\dfrac{3}{2}$.

### Skjæringspunkter

- **Med $y$-aksen:** Sett $x = 0$: $f(0) = \\dfrac{P(0)}{Q(0)}$
- **Med $x$-aksen:** Løs $P(x) = 0$
`,
        },
        {
          id: 'r1-m1-l3',
          moduleId: 'r1-m1',
          title: 'Eksponentialfunksjoner',
          estimatedMinutes: 30,
          order: 3,
          learningGoals: [
            'Kjenne til egenskapene til eksponentialfunksjoner',
            'Løse eksponentialligninger',
            'Gjenkjenne vekst og forfall i praktiske situasjoner',
          ],
          content: `## Eksponentialfunksjoner

En **eksponentialfunksjon** er på formen:

$$f(x) = a \\cdot b^x$$

der $a \\neq 0$, $b > 0$ og $b \\neq 1$.

### Viktige egenskaper

- **Definisjonsmengde:** $D_f = \\mathbb{R}$
- **Verdimengde:** $V_f = (0, \\infty)$ (når $a > 0$)
- Grafen skjærer $y$-aksen i $(0, a)$
- Grafen nærmer seg $x$-aksen asymptotisk (men aldri negativt)

### Vekst og forfall

| Vekst ($b > 1$) | Forfall ($0 < b < 1$) |
|-----------------|----------------------|
| Funksjonen øker | Funksjonen avtar |
| Jo større $b$, jo raskere vekst | Jo nærmere 0, jo raskere forfall |

**Eksempel – befolkningsvekst:**

En by har 50 000 innbyggere og vokser med 2% per år.

$$P(t) = 50000 \\cdot 1{,}02^t$$

Etter 10 år: $P(10) = 50000 \\cdot 1{,}02^{10} \\approx 60950$

### Løse eksponentialligninger

**Eksempel:** Løs $3^x = 81$

$$3^x = 3^4 \\Rightarrow x = 4$$

**Eksempel:** Løs $2^x = 7$

Her kan vi ikke direkte. Vi bruker logaritmer (se neste leksjon):

$$x = \\log_2 7 = \\frac{\\ln 7}{\\ln 2} \\approx 2{,}807$$

### Naturlig eksponentialfunksjon

Den naturlige eksponentialfunksjonen $f(x) = e^x$ er spesielt viktig i matematikken. Her er $e \\approx 2{,}718$ (**Eulers tall**).

$$\\frac{d}{dx}e^x = e^x$$

Denne egenskapen gjør $e^x$ unik.
`,
        },
        {
          id: 'r1-m1-l4',
          moduleId: 'r1-m1',
          title: 'Logaritmefunksjoner',
          estimatedMinutes: 35,
          order: 4,
          learningGoals: [
            'Forstå sammenhengen mellom eksponential- og logaritmefunksjoner',
            'Bruke logaritmereglene',
            'Løse logaritmelikninger',
            'Anvende logaritmer på praktiske problemer',
          ],
          content: `## Logaritmefunksjoner

**Logaritmen** er den inverse funksjonen til eksponentialfunksjonen:

$$\\log_b(a) = x \\iff b^x = a$$

der $b > 0$, $b \\neq 1$ og $a > 0$.

### Vanlige logaritmer

| Betegnelse | Formel | Merknad |
|------------|--------|---------|
| $\\log$ eller $\\lg$ | $\\log_{10}$ | Tierlogaritmen |
| $\\ln$ | $\\log_e$ | Naturlig logaritme |
| $\\log_b$ | Generell | Grunntall $b$ |

### Logaritmeregler

For $a, b > 0$ og $b \\neq 1$:

$$\\log_b(x \\cdot y) = \\log_b x + \\log_b y$$
$$\\log_b\\left(\\frac{x}{y}\\right) = \\log_b x - \\log_b y$$
$$\\log_b(x^r) = r \\cdot \\log_b x$$
$$\\log_b b = 1$$
$$\\log_b 1 = 0$$

### Bytteregelformelen

$$\\log_b x = \\frac{\\ln x}{\\ln b} = \\frac{\\log x}{\\log b}$$

### Løse logaritmelikninger

**Eksempel:** Løs $\\log_2(x+3) = 4$

$$2^4 = x + 3$$
$$16 = x + 3$$
$$x = 13$$

**Sjekk:** $\\log_2(13+3) = \\log_2(16) = 4$ ✓

**Eksempel:** Løs $\\ln(2x) + \\ln(x) = \\ln(8)$

$$\\ln(2x^2) = \\ln(8)$$
$$2x^2 = 8 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$$

(vi forkaster $x = -2$ siden $\\ln$ krever positive argumenter)

### Halvveringstid og fordoblingstid

**Halvveringstid $T_{1/2}$:** Tiden det tar for en eksponentialfunksjon med forfall å halvere seg.

$$T_{1/2} = \\frac{\\ln 2}{k}$$

der $k$ er forfallskonstanten i $f(t) = f_0 \\cdot e^{-kt}$.
`,
        },
      ],
      exercises: [
        {
          id: 'r1-m1-e1',
          moduleId: 'r1-m1',
          type: 'multiple-choice',
          question: 'Hva er graden til polynomet $P(x) = 3x^4 - 2x^2 + 7x - 1$?',
          options: ['2', '3', '4', '7'],
          correctIndex: 2,
          hint: 'Graden er den høyeste eksponenten i polynomet.',
          explanation: 'Graden er bestemt av det leddet med høyest eksponent. Her er det $3x^4$, så graden er 4.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m1-e2',
          moduleId: 'r1-m1',
          type: 'multiple-choice',
          question: 'Hvilke nullpunkter har $f(x) = x^2 - 4x + 3$?',
          options: ['$x = 1$ og $x = 3$', '$x = -1$ og $x = -3$', '$x = 2$ og $x = 2$', '$x = 4$ og $x = 0$'],
          correctIndex: 0,
          hint: 'Faktoriser andregradsuttrykket eller bruk ABC-formelen.',
          explanation: '$x^2 - 4x + 3 = (x-1)(x-3) = 0$ gir $x = 1$ eller $x = 3$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m1-e3',
          moduleId: 'r1-m1',
          type: 'multiple-choice',
          question: 'Hva er den vertikale asymptoten til $f(x) = \\dfrac{2x+1}{x-3}$?',
          options: ['$y = 3$', '$x = 3$', '$x = -\\frac{1}{2}$', '$y = 2$'],
          correctIndex: 1,
          hint: 'Vertikale asymptoter finnes der nevneren er null.',
          explanation: 'Nevneren $x - 3 = 0$ når $x = 3$. Dette gir en vertikal asymptote ved $x = 3$.',
          difficulty: 'middels',
        },
        {
          id: 'r1-m1-e4',
          moduleId: 'r1-m1',
          type: 'multiple-choice',
          question: 'Løs $2^{x+1} = 16$',
          options: ['$x = 2$', '$x = 3$', '$x = 4$', '$x = 8$'],
          correctIndex: 1,
          hint: 'Skriv 16 som en potens av 2.',
          explanation: '$16 = 2^4$, så $2^{x+1} = 2^4$, som gir $x+1 = 4$, altså $x = 3$.',
          difficulty: 'middels',
        },
        {
          id: 'r1-m1-e5',
          moduleId: 'r1-m1',
          type: 'multiple-choice',
          question: 'Hva er $\\log_3 81$?',
          options: ['3', '4', '27', '$\\frac{1}{4}$'],
          correctIndex: 1,
          hint: 'Spør deg selv: Hvilken eksponent gir 81 når grunntallet er 3?',
          explanation: '$3^4 = 81$, så $\\log_3 81 = 4$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m1-e6',
          moduleId: 'r1-m1',
          type: 'free-response',
          question: 'Et stoff har halvveringstid 5 år. Etter hvor mange år er 75% av stoffet borte?',
          hint: 'Sett opp ligningen $f(t) = f_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/5}$ og løs $f(t) = 0{,}25 \\cdot f_0$.',
          explanation: 'Vi vil ha $\\left(\\frac{1}{2}\\right)^{t/5} = 0{,}25 = \\left(\\frac{1}{2}\\right)^2$. Dermed er $\\frac{t}{5} = 2$, altså $t = 10$ år.',
          sampleAnswer: '10 år. Vi løser $\\left(\\frac{1}{2}\\right)^{t/5} = 0{,}25$, som gir $t/5 = 2$ og $t = 10$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r1-m1-quiz',
        moduleId: 'r1-m1',
        title: 'Quiz: Algebra og funksjoner',
        passingScore: 60,
        questions: [
          {
            id: 'r1-m1-q1',
            moduleId: 'r1-m1',
            type: 'multiple-choice',
            question: 'Hva er nullpunktene til $P(x) = x^2 - x - 6$?',
            options: ['$x = 2$ og $x = -3$', '$x = 3$ og $x = -2$', '$x = 6$ og $x = -1$', '$x = 1$ og $x = -6$'],
            correctIndex: 1,
            explanation: '$x^2 - x - 6 = (x-3)(x+2) = 0$ gir $x = 3$ og $x = -2$.',
            difficulty: 'lett',
          },
          {
            id: 'r1-m1-q2',
            moduleId: 'r1-m1',
            type: 'multiple-choice',
            question: 'Hva er den horisontale asymptoten til $f(x) = \\dfrac{5x^2 - 3}{2x^2 + 1}$?',
            options: ['$y = 0$', '$y = 3$', '$y = \\frac{5}{2}$', 'Ingen'],
            correctIndex: 2,
            explanation: 'Gradene er like (begge 2), så horisontal asymptote er $y = \\frac{5}{2}$ (forholdet mellom ledende koeffisienter).',
            difficulty: 'middels',
          },
          {
            id: 'r1-m1-q3',
            moduleId: 'r1-m1',
            type: 'multiple-choice',
            question: 'Løs $\\ln(x) = 3$',
            options: ['$x = 3$', '$x = e^3$', '$x = 3e$', '$x = 10^3$'],
            correctIndex: 1,
            explanation: '$\\ln(x) = 3 \\Rightarrow x = e^3 \\approx 20{,}09$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m1-q4',
            moduleId: 'r1-m1',
            type: 'multiple-choice',
            question: 'Forenkle $\\log 5 + \\log 2$',
            options: ['$\\log 7$', '$\\log 3$', '$\\log 10 = 1$', '$2\\log 5$'],
            correctIndex: 2,
            explanation: '$\\log 5 + \\log 2 = \\log(5 \\cdot 2) = \\log 10 = 1$.',
            difficulty: 'lett',
          },
          {
            id: 'r1-m1-q5',
            moduleId: 'r1-m1',
            type: 'multiple-choice',
            question: 'En investering på 10 000 kr vokser med 8% per år. Hva er verdien etter 5 år?',
            options: ['14 000 kr', '14 693 kr', '16 000 kr', '14 400 kr'],
            correctIndex: 1,
            explanation: '$V(5) = 10000 \\cdot 1{,}08^5 \\approx 14693$ kr.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 2: Geometri ────────────────────────────────────────────────────
    {
      id: 'r1-m2',
      courseId: 'r1',
      title: 'Geometri – vektorer og trigonometri',
      description: 'Vektorer i planet, skalarprodukt, og trigonometriske funksjoner.',
      order: 2,
      lessons: [
        {
          id: 'r1-m2-l1',
          moduleId: 'r1-m2',
          title: 'Vektorer i planet',
          estimatedMinutes: 40,
          order: 1,
          learningGoals: [
            'Definere vektorer og forstå vektorbegrepet',
            'Addere og subtrahere vektorer',
            'Multiplisere vektorer med skalarer',
            'Beregne lengden av en vektor',
            'Beregne skalarproduktet',
          ],
          content: `## Vektorer i planet

En **vektor** er en størrelse som har både retning og lengde (størrelse). Vi skriver vektorer med pil over: $\\vec{v}$, eller med fet skrift: **v**.

### Representasjon

I et koordinatsystem kan en vektor skrives som:

$$\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix}$$

### Vektoroperasjoner

**Addisjon:**
$$\\vec{u} + \\vec{v} = \\begin{pmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\end{pmatrix}$$

**Subtraksjon:**
$$\\vec{u} - \\vec{v} = \\begin{pmatrix} u_1 - v_1 \\\\ u_2 - v_2 \\end{pmatrix}$$

**Multiplikasjon med skalar $k$:**
$$k \\cdot \\vec{v} = \\begin{pmatrix} k v_1 \\\\ k v_2 \\end{pmatrix}$$

### Lengden av en vektor

$$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$$

**Eksempel:** $\\vec{v} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$

$$|\\vec{v}| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$$

### Skalarproduktet

Skalarproduktet (prikkproduktet) av to vektorer er:

$$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos \\theta$$

der $\\theta$ er vinkelen mellom vektorene.

**Vinkelregning:**
$$\\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$$

**Ortogonale vektorer:** Hvis $\\vec{u} \\cdot \\vec{v} = 0$, er vektorene **vinkelrette** (ortogonale).

**Eksempel:** Er $\\vec{a} = \\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$ og $\\vec{b} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$ ortogonale?

$$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 3 + (-3) \\cdot 2 = 6 - 6 = 0 \\checkmark$$

Ja, de er ortogonale.
`,
        },
        {
          id: 'r1-m2-l2',
          moduleId: 'r1-m2',
          title: 'Trigonometri',
          estimatedMinutes: 45,
          order: 2,
          learningGoals: [
            'Kunne sinussetningen og cosinussetningen',
            'Bruke trigonometri for å løse trekanter',
            'Kjenne til viktige trigonometriske verdier',
            'Løse trigonometriske ligninger',
          ],
          content: `## Trigonometri

### Definisjon med enhetssirkelen

For en vinkel $\\theta$ i standardposisjon på enhetssirkelen:

$$\\cos \\theta = x, \\quad \\sin \\theta = y, \\quad \\tan \\theta = \\frac{y}{x}$$

### Viktige verdier

| $\\theta$ | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ |
|-----------|-------|--------|--------|--------|--------|
| $\\sin \\theta$ | $0$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $1$ |
| $\\cos \\theta$ | $1$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ | $0$ |
| $\\tan \\theta$ | $0$ | $\\frac{1}{\\sqrt{3}}$ | $1$ | $\\sqrt{3}$ | ndef. |

### Sinussetningen

I en trekant $ABC$ med sider $a$, $b$, $c$ motstående til hjørnene $A$, $B$, $C$:

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$

**Bruksområder:** Når vi kjenner to vinkler og én side, eller to sider og en motstående vinkel.

### Cosinussetningen

$$c^2 = a^2 + b^2 - 2ab \\cos C$$

Tilsvarende: $a^2 = b^2 + c^2 - 2bc \\cos A$

**Bruksområder:** Når vi kjenner to sider og den innesluttede vinkelen, eller alle tre sider.

### Arealet av en trekant

$$T = \\frac{1}{2} a b \\sin C$$

### Løse trigonometriske ligninger

**Eksempel:** Løs $\\sin x = \\frac{1}{2}$ for $0 \\leq x < 2\\pi$

Grunnløsning: $x = \\frac{\\pi}{6}$ (30°)

Siden sinus er positiv i 1. og 2. kvadrant:
$$x = \\frac{\\pi}{6} \\quad \\text{eller} \\quad x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$$

For alle løsninger: $x = \\frac{\\pi}{6} + 2\\pi k$ eller $x = \\frac{5\\pi}{6} + 2\\pi k$, $k \\in \\mathbb{Z}$
`,
        },
      ],
      exercises: [
        {
          id: 'r1-m2-e1',
          moduleId: 'r1-m2',
          type: 'multiple-choice',
          question: 'Hva er lengden av vektoren $\\vec{v} = \\begin{pmatrix} -3 \\\\ 4 \\end{pmatrix}$?',
          options: ['1', '5', '7', '$\\sqrt{7}$'],
          correctIndex: 1,
          hint: 'Bruk formelen $|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$.',
          explanation: '$|\\vec{v}| = \\sqrt{(-3)^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m2-e2',
          moduleId: 'r1-m2',
          type: 'multiple-choice',
          question: 'Hva er skalarproduktet $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 4 \\\\ -1 \\end{pmatrix}$?',
          options: ['2', '3', '$\\begin{pmatrix} 4 \\\\ -2 \\end{pmatrix}$', '6'],
          correctIndex: 0,
          hint: 'Skalarproduktet er summen av produktene av tilsvarende komponenter.',
          explanation: '$1 \\cdot 4 + 2 \\cdot (-1) = 4 - 2 = 2$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m2-e3',
          moduleId: 'r1-m2',
          type: 'multiple-choice',
          question: 'I trekant $ABC$ er $a = 5$, $b = 7$ og $C = 60°$. Hva er $c$?',
          options: ['$\\sqrt{39}$', '$6$', '$\\sqrt{49}$', '$\\sqrt{29}$'],
          correctIndex: 0,
          hint: 'Bruk cosinussetningen: $c^2 = a^2 + b^2 - 2ab\\cos C$.',
          explanation: '$c^2 = 25 + 49 - 2 \\cdot 5 \\cdot 7 \\cdot \\cos 60° = 74 - 35 = 39$, så $c = \\sqrt{39}$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r1-m2-quiz',
        moduleId: 'r1-m2',
        title: 'Quiz: Geometri',
        passingScore: 60,
        questions: [
          {
            id: 'r1-m2-q1',
            moduleId: 'r1-m2',
            type: 'multiple-choice',
            question: 'Hva er vinkelen mellom $\\vec{u} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ og $\\vec{v} = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$?',
            options: ['$0°$', '$30°$', '$45°$', '$90°$'],
            correctIndex: 2,
            explanation: '$\\cos \\theta = \\frac{1 \\cdot 1 + 0 \\cdot 1}{1 \\cdot \\sqrt{2}} = \\frac{1}{\\sqrt{2}}$, så $\\theta = 45°$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m2-q2',
            moduleId: 'r1-m2',
            type: 'multiple-choice',
            question: 'Hva er $\\sin(150°)$?',
            options: ['$-\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$-\\frac{\\sqrt{3}}{2}$'],
            correctIndex: 2,
            explanation: '$\\sin(150°) = \\sin(180° - 30°) = \\sin(30°) = \\frac{1}{2}$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m2-q3',
            moduleId: 'r1-m2',
            type: 'multiple-choice',
            question: 'Arealet av en trekant med to sider $a=4$, $b=6$ og innesluttet vinkel $C = 30°$ er:',
            options: ['6', '12', '24', '$6\\sqrt{3}$'],
            correctIndex: 0,
            explanation: '$T = \\frac{1}{2} \\cdot 4 \\cdot 6 \\cdot \\sin 30° = 12 \\cdot \\frac{1}{2} = 6$.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 3: Kombinatorikk og sannsynlighet ──────────────────────────────
    {
      id: 'r1-m3',
      courseId: 'r1',
      title: 'Kombinatorikk og sannsynlighet',
      description: 'Telleprinsipper, permutasjoner, kombinasjoner og sannsynlighetsregning.',
      order: 3,
      lessons: [
        {
          id: 'r1-m3-l1',
          moduleId: 'r1-m3',
          title: 'Telleprinsipper',
          estimatedMinutes: 30,
          order: 1,
          learningGoals: [
            'Bruke multiplikasjonsprinsippet',
            'Beregne permutasjoner',
            'Beregne kombinasjoner',
            'Bruke binomialkoeffisienter',
          ],
          content: `## Telleprinsipper

### Multiplikasjonsprinsippet

Hvis en handling kan gjøres på $m$ måter og en annen uavhengig handling kan gjøres på $n$ måter, kan begge utføres i $m \\cdot n$ måter.

**Eksempel:** Et passord har én bokstav (26 muligheter) og et siffer (10 muligheter). Det gir $26 \\cdot 10 = 260$ passord.

### Permutasjoner

En **permutasjon** er en ordnet oppramsing av objekter.

Antall måter å ordne $n$ forskjellige objekter:
$$n! = n \\cdot (n-1) \\cdot (n-2) \\cdots 2 \\cdot 1$$

Antall måter å velge og ordne $r$ objekter fra $n$:
$$P(n, r) = \\frac{n!}{(n-r)!}$$

**Eksempel:** På 5 startere i et løp, på hvor mange måter kan 1., 2. og 3. plass fordeles?

$$P(5, 3) = \\frac{5!}{(5-3)!} = \\frac{120}{2} = 60$$

### Kombinasjoner

En **kombinasjon** er et utvalg der rekkefølgen ikke betyr noe.

$$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$

**Eksempel:** Velg 3 av 7 spiller til et lag:

$$\\binom{7}{3} = \\frac{7!}{3! \\cdot 4!} = \\frac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$$

### Binomialteoremet

$$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k$$

**Eksempel:** $(x+2)^3 = x^3 + 6x^2 + 12x + 8$
`,
        },
        {
          id: 'r1-m3-l2',
          moduleId: 'r1-m3',
          title: 'Sannsynlighetsregning',
          estimatedMinutes: 40,
          order: 2,
          learningGoals: [
            'Forstå grunnleggende sannsynlighetsbegreper',
            'Beregne sannsynligheter ved hjelp av kombinatorikk',
            'Bruke addisjonsloven og multiplikasjonsloven',
            'Forstå betinget sannsynlighet',
          ],
          content: `## Sannsynlighetsregning

### Grunnbegreper

- **Utfallsrom** $\\Omega$: Mengden av alle mulige utfall
- **Hendelse** $A$: En delmengde av utfallsrommet
- **Sannsynlighet** $P(A)$: Et tall mellom 0 og 1

For likesannsynlige utfall:
$$P(A) = \\frac{\\text{Antall gunstige utfall}}{\\text{Totalt antall utfall}}$$

### Komplementhendelse

$$P(A^c) = 1 - P(A)$$

### Addisjonsloven

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

For **gjensidig utelukkende** hendelser ($A \\cap B = \\emptyset$):
$$P(A \\cup B) = P(A) + P(B)$$

### Multiplikasjonsloven

For **uavhengige** hendelser:
$$P(A \\cap B) = P(A) \\cdot P(B)$$

For **avhengige** hendelser:
$$P(A \\cap B) = P(A) \\cdot P(B | A)$$

### Betinget sannsynlighet

$$P(B | A) = \\frac{P(A \\cap B)}{P(A)}$$

**Eksempel:** To kort trekkes uten tilbakelegging fra en vanlig kortstokk (52 kort). Hva er sannsynligheten for at begge er ess?

$$P(\\text{ess}_1 \\cap \\text{ess}_2) = P(\\text{ess}_1) \\cdot P(\\text{ess}_2 | \\text{ess}_1) = \\frac{4}{52} \\cdot \\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$$
`,
        },
      ],
      exercises: [
        {
          id: 'r1-m3-e1',
          moduleId: 'r1-m3',
          type: 'multiple-choice',
          question: 'På hvor mange måter kan 4 personer sette seg i en rekke?',
          options: ['12', '16', '24', '28'],
          correctIndex: 2,
          hint: 'Antall permutasjoner av $n$ objekter er $n!$.',
          explanation: '$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m3-e2',
          moduleId: 'r1-m3',
          type: 'multiple-choice',
          question: 'Hva er $\\binom{6}{2}$?',
          options: ['12', '15', '18', '30'],
          correctIndex: 1,
          hint: '$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$.',
          explanation: '$\\binom{6}{2} = \\frac{6!}{2! \\cdot 4!} = \\frac{30}{2} = 15$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m3-e3',
          moduleId: 'r1-m3',
          type: 'multiple-choice',
          question: 'En terning kastes to ganger. Hva er sannsynligheten for å få minst én sekser?',
          options: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{11}{36}$', '$\\frac{13}{36}$'],
          correctIndex: 2,
          hint: 'Bruk komplementhendelsen: $P(\\text{minst én 6}) = 1 - P(\\text{ingen 6})$.',
          explanation: '$P(\\text{ingen 6}) = \\frac{5}{6} \\cdot \\frac{5}{6} = \\frac{25}{36}$. $P(\\text{minst én 6}) = 1 - \\frac{25}{36} = \\frac{11}{36}$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r1-m3-quiz',
        moduleId: 'r1-m3',
        title: 'Quiz: Kombinatorikk og sannsynlighet',
        passingScore: 60,
        questions: [
          {
            id: 'r1-m3-q1',
            moduleId: 'r1-m3',
            type: 'multiple-choice',
            question: 'Hvor mange 3-bokstavskoder kan lages fra alfabetets 26 bokstaver (bokstaver kan gjentaes)?',
            options: ['78', '2600', '17576', '15600'],
            correctIndex: 2,
            explanation: '$26^3 = 17576$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m3-q2',
            moduleId: 'r1-m3',
            type: 'multiple-choice',
            question: 'Et utvalg på 2 kort trekkes fra en kortstokk med 52 kort. Hva er sannsynligheten for to røde kort?',
            options: ['$\\frac{1}{4}$', '$\\frac{25}{102}$', '$\\frac{1}{2}$', '$\\frac{1}{3}$'],
            correctIndex: 1,
            explanation: '$P = \\frac{\\binom{26}{2}}{\\binom{52}{2}} = \\frac{325}{1326} = \\frac{25}{102}$.',
            difficulty: 'vanskelig',
          },
        ],
      },
    },

    // ─── Modul 4: Derivasjon ──────────────────────────────────────────────────
    {
      id: 'r1-m4',
      courseId: 'r1',
      title: 'Derivasjon',
      description: 'Grenseverdier, derivasjonsregler og optimalisering.',
      order: 4,
      lessons: [
        {
          id: 'r1-m4-l1',
          moduleId: 'r1-m4',
          title: 'Derivasjonsregler',
          estimatedMinutes: 45,
          order: 1,
          learningGoals: [
            'Forstå den deriverte som grenseverdi',
            'Anvende grunnleggende derivasjonsregler',
            'Derivere sammensatte funksjoner (kjerneregelen)',
            'Derivere produkter og kvotienter',
          ],
          content: `## Derivasjonsregler

### Den deriverte – definisjon

Den deriverte av $f$ i punktet $x$ er:

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

Den deriverte angir den øyeblikkelige endringsraten – stigningstallet til tangenten.

### Grunnleggende regler

| Funksjon | Derivert |
|----------|----------|
| $f(x) = c$ (konstant) | $f'(x) = 0$ |
| $f(x) = x^n$ | $f'(x) = nx^{n-1}$ |
| $f(x) = e^x$ | $f'(x) = e^x$ |
| $f(x) = \\ln x$ | $f'(x) = \\frac{1}{x}$ |
| $f(x) = \\sin x$ | $f'(x) = \\cos x$ |
| $f(x) = \\cos x$ | $f'(x) = -\\sin x$ |

### Regneregler

**Sumregel:** $(f + g)' = f' + g'$

**Konstantregel:** $(cf)' = c \\cdot f'$

**Produktregel:** $(f \\cdot g)' = f' \\cdot g + f \\cdot g'$

**Kvotregel:** $\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}$

**Kjerneregelen:** $(f(g(x)))' = f'(g(x)) \\cdot g'(x)$

### Eksempler

**Eksempel 1:** Deriver $f(x) = 3x^4 - 2x^2 + 5$

$$f'(x) = 12x^3 - 4x$$

**Eksempel 2:** Deriver $f(x) = e^{2x}$ (kjerneregelen)

$$f'(x) = e^{2x} \\cdot 2 = 2e^{2x}$$

**Eksempel 3:** Deriver $f(x) = \\ln(x^2 + 1)$

$$f'(x) = \\frac{2x}{x^2 + 1}$$

**Eksempel 4:** Deriver $f(x) = x^2 \\cdot \\sin x$ (produktregelen)

$$f'(x) = 2x \\cdot \\sin x + x^2 \\cdot \\cos x$$
`,
        },
        {
          id: 'r1-m4-l2',
          moduleId: 'r1-m4',
          title: 'Optimalisering',
          estimatedMinutes: 40,
          order: 2,
          learningGoals: [
            'Finne lokale og globale ekstrema',
            'Bruke fortegnsskjema for den deriverte',
            'Løse praktiske optimaliseringsoppgaver',
          ],
          content: `## Optimalisering

### Stasjonære punkter

Et punkt $x = a$ er **stasjonært** hvis $f'(a) = 0$.

Stasjonære punkter kan være:
- **Lokalt maksimum:** $f'$ skifter fortegn fra $+$ til $-$
- **Lokalt minimum:** $f'$ skifter fortegn fra $-$ til $+$
- **Terrassepunkt (sadelpunkt):** $f'$ skifter ikke fortegn

### Andrederiverte-testen

Hvis $f'(a) = 0$:
- $f''(a) > 0 \\Rightarrow$ lokalt minimum
- $f''(a) < 0 \\Rightarrow$ lokalt maksimum
- $f''(a) = 0 \\Rightarrow$ uavklart (bruk fortegnsskjema)

### Fremgangsmåte

1. Finn $f'(x)$
2. Løs $f'(x) = 0$ for å finne stasjonære punkter
3. Bruk fortegnsskjema eller andrederiverte-testen
4. Beregn funksjonsverdi i ekstremalene
5. Sjekk randpunktene om domenet er begrenset

### Eksempel

Finn maksimum- og minimumsverdien av $f(x) = x^3 - 3x$ på $[-2, 2]$.

$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$

Stasjonære punkter: $x = 1$ og $x = -1$

| $x$ | $f(x)$ |
|-----|---------|
| $-2$ | $-8 + 6 = -2$ |
| $-1$ | $-1 + 3 = 2$ |
| $1$ | $1 - 3 = -2$ |
| $2$ | $8 - 6 = 2$ |

Globalt maksimum: $f = 2$ ved $x = -1$ og $x = 2$
Globalt minimum: $f = -2$ ved $x = 1$ og $x = -2$

### Praktisk optimalisering

**Eksempel:** En bonde vil gjerde inn et rektangulært område langs en elv (den ene siden trenger ikke gjerde). Han har 100 m gjerde. Maksimer arealet.

La bredden være $x$ og lengden $y$. Da er $2x + y = 100$, så $y = 100 - 2x$.

$$A(x) = x \\cdot y = x(100 - 2x) = 100x - 2x^2$$

$$A'(x) = 100 - 4x = 0 \\Rightarrow x = 25$$

Maksimalt areal: $A(25) = 25 \\cdot 50 = 1250 \\text{ m}^2$
`,
        },
      ],
      exercises: [
        {
          id: 'r1-m4-e1',
          moduleId: 'r1-m4',
          type: 'multiple-choice',
          question: 'Hva er den deriverte av $f(x) = 5x^3 - 3x + 2$?',
          options: ['$15x^2 + 3$', '$15x^2 - 3$', '$5x^2 - 3$', '$15x^2$'],
          correctIndex: 1,
          hint: 'Bruk potensregelen: $(x^n)\' = nx^{n-1}$.',
          explanation: '$f\'(x) = 5 \\cdot 3x^2 - 3 + 0 = 15x^2 - 3$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m4-e2',
          moduleId: 'r1-m4',
          type: 'multiple-choice',
          question: 'Bruk kjerneregelen for å derivere $f(x) = (2x+1)^5$',
          options: ['$5(2x+1)^4$', '$10(2x+1)^4$', '$5(2x+1)^5$', '$2(2x+1)^4$'],
          correctIndex: 1,
          hint: 'La $u = 2x + 1$. Da er $f = u^5$ og $u\' = 2$.',
          explanation: '$f\'(x) = 5(2x+1)^4 \\cdot 2 = 10(2x+1)^4$.',
          difficulty: 'middels',
        },
        {
          id: 'r1-m4-e3',
          moduleId: 'r1-m4',
          type: 'multiple-choice',
          question: 'En funksjon $f$ har $f\'(-1) = 0$, $f\'(-2) > 0$ og $f\'(0) < 0$. Hva er $x = -1$?',
          options: ['Lokalt minimum', 'Lokalt maksimum', 'Terrassepunkt', 'Global maksimum'],
          correctIndex: 1,
          hint: 'Se på fortegnskiftet til $f\'$ rundt $x = -1$.',
          explanation: 'Siden $f\'$ skifter fra positiv (til venstre for $-1$) til negativ (til høyre), er $x = -1$ et lokalt maksimum.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r1-m4-quiz',
        moduleId: 'r1-m4',
        title: 'Quiz: Derivasjon',
        passingScore: 60,
        questions: [
          {
            id: 'r1-m4-q1',
            moduleId: 'r1-m4',
            type: 'multiple-choice',
            question: 'Hva er $\\frac{d}{dx}[e^{3x}]$?',
            options: ['$e^{3x}$', '$3e^{3x}$', '$3xe^{3x-1}$', '$e^{3x+1}$'],
            correctIndex: 1,
            explanation: 'Kjerneregelen: $\\frac{d}{dx}[e^{3x}] = e^{3x} \\cdot 3 = 3e^{3x}$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m4-q2',
            moduleId: 'r1-m4',
            type: 'multiple-choice',
            question: 'Finn stasjonære punkter til $f(x) = 2x^3 - 6x$',
            options: ['$x = 0$', '$x = \\pm 1$', '$x = \\pm\\sqrt{3}$', '$x = 3$'],
            correctIndex: 1,
            explanation: '$f\'(x) = 6x^2 - 6 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m4-q3',
            moduleId: 'r1-m4',
            type: 'multiple-choice',
            question: 'Deriver $f(x) = \\frac{x}{x+1}$ ved hjelp av kvotregel',
            options: ['$\\frac{1}{(x+1)^2}$', '$\\frac{x}{(x+1)^2}$', '$\\frac{-1}{(x+1)^2}$', '$\\frac{1}{x+1}$'],
            correctIndex: 0,
            explanation: '$f\'(x) = \\frac{1 \\cdot (x+1) - x \\cdot 1}{(x+1)^2} = \\frac{1}{(x+1)^2}$.',
            difficulty: 'middels',
          },
        ],
      },
    },

    // ─── Modul 5: Integrasjon ─────────────────────────────────────────────────
    {
      id: 'r1-m5',
      courseId: 'r1',
      title: 'Integrasjon',
      description: 'Ubestemte og bestemte integraler, integrasjonsmetoder og arealberegning.',
      order: 5,
      lessons: [
        {
          id: 'r1-m5-l1',
          moduleId: 'r1-m5',
          title: 'Ubestemte integraler og integrasjonsregler',
          estimatedMinutes: 45,
          order: 1,
          learningGoals: [
            'Forstå integrasjon som den inverse operasjonen til derivasjon',
            'Anvende grunnleggende integrasjonsregler',
            'Utføre integrasjon ved substitusjon',
          ],
          content: `## Ubestemte integraler

Integrasjon er den inverse operasjonen til derivasjon. Hvis $F'(x) = f(x)$, er $F(x)$ en **antiderivert** av $f$.

### Ubestemt integral

$$\\int f(x)\\,dx = F(x) + C$$

der $C$ er en vilkårlig konstant (**integrasjonskonstanten**).

### Grunnleggende integrasjonsregler

| Funksjon $f(x)$ | $\\int f(x)\\,dx$ |
|-----------------|-----------------|
| $x^n$ ($ n \\neq -1$) | $\\frac{x^{n+1}}{n+1} + C$ |
| $\\frac{1}{x}$ | $\\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $e^{ax}$ | $\\frac{1}{a}e^{ax} + C$ |
| $\\sin x$ | $-\\cos x + C$ |
| $\\cos x$ | $\\sin x + C$ |

### Regneregler

$$\\int [f(x) + g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx$$
$$\\int c \\cdot f(x)\\,dx = c \\int f(x)\\,dx$$

### Integrasjon ved substitusjon

La $u = g(x)$, da er $du = g'(x)\\,dx$.

**Eksempel:** $\\int 2x \\cdot e^{x^2}\\,dx$

La $u = x^2$, da $du = 2x\\,dx$:

$$\\int e^u\\,du = e^u + C = e^{x^2} + C$$

### Eksempler

$$\\int (3x^2 - 4x + 1)\\,dx = x^3 - 2x^2 + x + C$$

$$\\int \\frac{3}{x^2}\\,dx = \\int 3x^{-2}\\,dx = -\\frac{3}{x} + C$$
`,
        },
        {
          id: 'r1-m5-l2',
          moduleId: 'r1-m5',
          title: 'Bestemt integral og arealberegning',
          estimatedMinutes: 40,
          order: 2,
          learningGoals: [
            'Forstå det bestemte integralet som areal under kurve',
            'Anvende analysens fundamentalteorem',
            'Beregne arealet mellom kurver',
          ],
          content: `## Bestemt integral og arealberegning

### Analysens fundamentalteorem

$$\\int_a^b f(x)\\,dx = F(b) - F(a) = \\Big[F(x)\\Big]_a^b$$

der $F'(x) = f(x)$.

### Areal under kurven

Arealet mellom kurven $y = f(x)$ og $x$-aksen fra $x = a$ til $x = b$ (når $f(x) \\geq 0$):

$$A = \\int_a^b f(x)\\,dx$$

Hvis $f(x) < 0$ i et intervall, er integralet negativt. For selve arealet:

$$A = \\int_a^b |f(x)|\\,dx$$

### Arealet mellom to kurver

$$A = \\int_a^b [f(x) - g(x)]\\,dx$$

når $f(x) \\geq g(x)$ på $[a, b]$.

### Eksempler

**Eksempel 1:** $\\int_0^3 (x^2 - x)\\,dx$

$$= \\left[\\frac{x^3}{3} - \\frac{x^2}{2}\\right]_0^3 = \\left(\\frac{27}{3} - \\frac{9}{2}\\right) - 0 = 9 - 4{,}5 = 4{,}5$$

**Eksempel 2:** Areal mellom $f(x) = x^2$ og $g(x) = x$ fra $x = 0$ til $x = 1$.

$$A = \\int_0^1 (x - x^2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$$
`,
        },
      ],
      exercises: [
        {
          id: 'r1-m5-e1',
          moduleId: 'r1-m5',
          type: 'multiple-choice',
          question: 'Hva er $\\int 6x^2\\,dx$?',
          options: ['$12x + C$', '$2x^3 + C$', '$6x^3 + C$', '$3x^2 + C$'],
          correctIndex: 1,
          hint: 'Bruk potensregelen: $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.',
          explanation: '$\\int 6x^2\\,dx = 6 \\cdot \\frac{x^3}{3} + C = 2x^3 + C$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m5-e2',
          moduleId: 'r1-m5',
          type: 'multiple-choice',
          question: 'Beregn $\\int_1^3 2x\\,dx$',
          options: ['4', '6', '8', '10'],
          correctIndex: 2,
          hint: 'Finn antideriverte og bruk grensene.',
          explanation: '$\\int_1^3 2x\\,dx = [x^2]_1^3 = 9 - 1 = 8$.',
          difficulty: 'lett',
        },
        {
          id: 'r1-m5-e3',
          moduleId: 'r1-m5',
          type: 'multiple-choice',
          question: 'Hva er $\\int e^{5x}\\,dx$?',
          options: ['$5e^{5x} + C$', '$e^{5x} + C$', '$\\frac{1}{5}e^{5x} + C$', '$\\frac{e^{5x}}{5x} + C$'],
          correctIndex: 2,
          hint: 'For $\\int e^{ax}\\,dx$, del på $a$.',
          explanation: '$\\int e^{5x}\\,dx = \\frac{1}{5}e^{5x} + C$.',
          difficulty: 'middels',
        },
      ],
      quiz: {
        id: 'r1-m5-quiz',
        moduleId: 'r1-m5',
        title: 'Quiz: Integrasjon',
        passingScore: 60,
        questions: [
          {
            id: 'r1-m5-q1',
            moduleId: 'r1-m5',
            type: 'multiple-choice',
            question: 'Hva er $\\int_0^{\\pi} \\sin x\\,dx$?',
            options: ['0', '1', '2', '$\\pi$'],
            correctIndex: 2,
            explanation: '$[-\\cos x]_0^{\\pi} = -\\cos\\pi - (-\\cos 0) = 1 + 1 = 2$.',
            difficulty: 'middels',
          },
          {
            id: 'r1-m5-q2',
            moduleId: 'r1-m5',
            type: 'multiple-choice',
            question: 'Areal under $f(x) = 4 - x^2$ over $x$-aksen er:',
            options: ['$\\frac{16}{3}$', '$4$', '$\\frac{32}{3}$', '$8$'],
            correctIndex: 2,
            explanation: 'Funksjonen er positiv mellom $x = -2$ og $x = 2$. $\\int_{-2}^{2}(4-x^2)\\,dx = [4x - \\frac{x^3}{3}]_{-2}^{2} = (8 - \\frac{8}{3}) - (-8 + \\frac{8}{3}) = \\frac{32}{3}$.',
            difficulty: 'vanskelig',
          },
          {
            id: 'r1-m5-q3',
            moduleId: 'r1-m5',
            type: 'multiple-choice',
            question: 'Hvilken av disse er antiderivert til $\\frac{1}{x}$?',
            options: ['$-\\frac{1}{x^2}$', '$\\ln x$', '$\\ln|x|$', '$\\frac{x^2}{2}$'],
            correctIndex: 2,
            explanation: '$\\int \\frac{1}{x}\\,dx = \\ln|x| + C$ (absoluttverdien er viktig for $x < 0$).',
            difficulty: 'middels',
          },
        ],
      },
    },
  ],
}
