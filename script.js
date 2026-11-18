/* ════════════════════════════════════════════
   KHAIRY ELSAYED — EXECUTIVE CS PORTFOLIO
   High-Performance Software Engineer & CS Sophomore
   script.js
════════════════════════════════════════════ */

'use strict';

/* ── 1. DOM REFS ── */
const html          = document.documentElement;
const navbar        = document.getElementById('navbar');
const themeToggle   = document.getElementById('themeToggle');
const hamburger     = document.getElementById('hamburger');
const mobileDrawer  = document.getElementById('mobileDrawer');
const cvBtn         = document.getElementById('cvBtn');
const contactForm   = document.getElementById('contactForm');
const formSubmit    = document.getElementById('formSubmit');
const formSuccess   = document.getElementById('formSuccess');
const cursorGlow    = document.getElementById('cursorGlow');

// Avatar refs
const avatarImg      = document.getElementById('avatarImg');
const avatarInitials = document.getElementById('avatarInitials');

// Modal refs
const projectModal  = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalContent  = document.getElementById('modalContent');
const projectCards  = document.querySelectorAll('.proj-card');

/* ── 2. AVATAR IMAGE DISCOVERY & FALLBACK ── */
if (avatarImg && avatarInitials) {
  const candidateImages = [
    'profile.jpg',
    'profile.png',
    'profile.jpeg',
    'khairy.jpg',
    'khairy.png',
    'photo.jpg'
  ];
  let imgIndex = 0;

  function tryNextImage() {
    if (imgIndex < candidateImages.length) {
      avatarImg.src = candidateImages[imgIndex++];
    } else {
      avatarImg.style.display = 'none';
      avatarInitials.style.display = 'flex';
    }
  }

  avatarImg.addEventListener('error', tryNextImage);
  avatarImg.addEventListener('load', () => {
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  });

  tryNextImage();
}

/* ── 3. THEME TOGGLE ── */
const savedTheme = localStorage.getItem('ke-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ke-theme', next);
});

/* ── 4. NAVBAR SCROLL STATE ── */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── 5. ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });

sections.forEach(s => activeIO.observe(s));

/* ── 6. HAMBURGER ── */
hamburger.addEventListener('click', () => {
  const open = mobileDrawer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);

  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.d-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

/* ── 7. REVEAL ANIMATIONS ── */
const revealEls = document.querySelectorAll('.reveal');

const revealIO = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 35);
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealIO.observe(el));

/* ── 8. SKILL BAR FILL ANIMATION ── */
const skillFills = document.querySelectorAll('.sk-fill');

const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = e.target.getAttribute('data-pct');
      setTimeout(() => { e.target.style.width = `${pct}%`; }, 250);
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(b => barIO.observe(b));

/* ── 9. EDUCATION PROGRESS BAR ── */
const eduFills = document.querySelectorAll('.edu-progress-fill');

const eduIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = e.target.getAttribute('data-pct');
      setTimeout(() => { e.target.style.width = `${pct}%`; }, 350);
      eduIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

eduFills.forEach(f => eduIO.observe(f));

/* ── 10. CURSOR GLOW ── */
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

function animateCursor() {
  glowX += (mouseX - glowX) * 0.07;
  glowY += (mouseY - glowY) * 0.07;
  if (cursorGlow) {
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top  = `${glowY}px`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── 11. HERO PARALLAX ── */
const heroHeading = document.querySelector('.hero-heading');
const heroDesc    = document.querySelector('.hero-desc');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroHeading) {
    heroHeading.style.transform = `translateY(${sy * 0.05}px)`;
    heroHeading.style.opacity   = `${Math.max(0, 1 - sy / 600)}`;
  }
  if (heroDesc) {
    heroDesc.style.transform = `translateY(${sy * 0.025}px)`;
    heroDesc.style.opacity   = `${Math.max(0, 1 - sy / 500)}`;
  }
}, { passive: true });

/* ── 12. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ── 13. PROJECT MODAL DATA & HANDLERS ── */
const projectsData = {
  'ds-engine': {
    badge: 'C++ & Advanced Data Structures',
    title: 'Data Structures & Expression Compiler',
    desc: 'A zero-dependency, high-throughput computational engine implementing self-contained Doubly Linked Lists, Generic Stacks, and recursive Binary Search Trees (BST), combined with a Shunting-Yard arithmetic expression compiler and empirical Big-O runtime profiling.',
    features: [
      'Generic Doubly Linked List with O(1) bidirectional mutations and dynamic capacity management.',
      'Binary Search Tree (BST) featuring recursive search, insertion, and In-Order/Pre-Order traversals.',
      'Stack-based Infix to Postfix expression converter utilizing Dijkstra\'s Shunting-Yard algorithm.',
      'Automated Big-O benchmark comparison measuring runtime and memory allocations against standard STL implementations.'
    ],
    oopConcept: 'Advanced use of C++ Templates / Generics, RAII (Resource Acquisition Is Initialization) for deterministic pointer cleanup in destructors, and strict const-correctness.',
    codeSnippet: `// Generic Binary Search Tree Node & Interface
template <typename T>
class BinarySearchTree {
    struct Node {
        T data;
        Node* left;
        Node* right;
        Node(T val) : data(val), left(nullptr), right(nullptr) {}
    };
    Node* root = nullptr;
public:
    void insert(const T& value);
    bool search(const T& value) const;
    void inorder(void (*visit)(const T&)) const;
    ~BinarySearchTree(); // RAII recursive deallocation
};`
  },
  'student-mgmt': {
    badge: 'C++ & Object-Oriented Architecture',
    title: 'Academic Registry & Information System',
    desc: 'An enterprise-style academic registry designed with strict object-oriented hierarchies (Inheritance, Polymorphic contracts, Encapsulation) and persistent serialized data stores supporting CRUD, GPA analytics, and defensive input auditing.',
    features: [
      'Polymorphic Person base class cleanly extended by Student and Instructor subclasses.',
      'Full CRUD operations for managing student enrollments, course catalogs, and GPA computations.',
      'File I/O persistence enabling cross-session data storage in structured text format.',
      'Defensive input validation that sanitizes inputs and protects against memory errors.'
    ],
    oopConcept: 'Abstract Base Classes, Pure Virtual Functions (`displayDetails()`), Encapsulation via private member variables, and Virtual Destructors.',
    codeSnippet: `class Person {
protected:
    string id, name;
public:
    Person(string i, string n) : id(i), name(n) {}
    virtual void displayDetails() const = 0;
    virtual ~Person() {} // Virtual destructor for memory safety
};

class Student : public Person {
    double gpa;
    vector<string> enrolledCourses;
public:
    void displayDetails() const override;
    double calculateGPA() const;
};`
  },
  'banking-system': {
    badge: 'C++ & Financial Logic',
    title: 'Secure Financial Transaction Engine',
    desc: 'A transactional banking simulation enforcing strict state invariants, overdraft immunity, PIN authentication, and structured historical audit logging with formatted statement generation.',
    features: [
      'Protected transactions: Deposit, Withdrawal, Transfer, and Balance Inquiry.',
      'Invariant enforcement: prevents overdrafts and guarantees atomic account updates.',
      'Ledger auditing: logs timestamped transaction histories for account statement generation.',
      'Secure PIN validation and role separation for bank clients.'
    ],
    oopConcept: 'Encapsulation of private financial balances, strict accessor/mutator patterns, and modular separation of Banking Core and User Interface.',
    codeSnippet: `class BankAccount {
private:
    string accountNumber;
    string ownerName;
    double balance;
    vector<string> transactionLogs;
public:
    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        logTransaction("WITHDRAW", amount);
        return true;
    }
};`
  },
  'todo-app': {
    badge: 'C++ & Data Structures',
    title: 'Priority Task Orchestrator & CLI',
    desc: 'A high-performance command-line scheduling tool driven by priority queues, multi-criteria deadline sorting, status filters, and robust state persistence across terminal sessions.',
    features: [
      'Priority queue mechanism sorting tasks dynamically by priority and deadline.',
      'Dynamic storage utilizing C++ vectors and custom structs with quick search.',
      'Cross-session state persistence via automatic file serialization.',
      'Intuitive terminal command interface for fast adding, toggling, and filtering.'
    ],
    oopConcept: 'Struct and Class modeling for Tasks and TaskLists, custom comparison operators (`operator<`), and file stream abstraction.',
    codeSnippet: `struct Task {
    int id;
    string title;
    int priority; // 1: High, 2: Medium, 3: Low
    bool completed;

    bool operator<(const Task& other) const {
        return priority > other.priority; // Min-heap priority
    }
};`
  }
};

function openProjectModal(projectId) {
  const p = projectsData[projectId];
  if (!p) return;

  modalContent.innerHTML = `
    <div class="modal-header">
      <span class="modal-badge">${p.badge}</span>
      <h3 class="modal-title">${p.title}</h3>
      <p class="modal-body">${p.desc}</p>
    </div>

    <div class="modal-section-title">Key Engineering Highlights</div>
    <ul class="modal-list">
      ${p.features.map(f => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${f}</span>
        </li>
      `).join('')}
    </ul>

    <div class="modal-section-title">OOP Architecture &amp; CS Concepts</div>
    <p class="modal-body">${p.oopConcept}</p>

    <div class="modal-section-title">Code Architecture Preview</div>
    <pre class="modal-code-block"><code>${p.codeSnippet}</code></pre>

    <div class="modal-footer">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.82rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
        Inspect Source on GitHub
      </a>
      <button class="btn-outline" onclick="closeProjectModal()" style="padding: 0.6rem 1.2rem; font-size: 0.82rem;">
        Dismiss Preview
      </button>
    </div>
  `;

  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') return;
    const pid = card.getAttribute('data-project');
    if (pid) openProjectModal(pid);
  });
});

modalClose.addEventListener('click', closeProjectModal);
modalBackdrop.addEventListener('click', closeProjectModal);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

/* ── 14. CONTACT FORM ── */
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  formSubmit.disabled = true;
  formSubmit.querySelector('.submit-text').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Transmitting…
  `;

  if (!document.getElementById('spin-style')) {
    const st = document.createElement('style');
    st.id = 'spin-style';
    st.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(st);
  }

  setTimeout(() => {
    formSubmit.disabled = false;
    formSubmit.querySelector('.submit-text').innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      Transmit Message
    `;
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ── 15. EXECUTIVE RESUME (CV) DOWNLOAD ── */
cvBtn.addEventListener('click', () => {
  const cv = `================================================================================
KHAIRY ELSAYED
High-Performance Software Engineer & Systems Specialist | CS Sophomore (Year 2)
================================================================================

CONTACT & NETWORKS
  Email       : khairykewan13@gmail.com
  Phone       : +20 155 422 6701
  Location    : Egypt (Available for On-Site, Relocation & Remote Internships)
  GitHub      : https://github.com
  LinkedIn    : https://linkedin.com

================================================================================
EXECUTIVE PROFILE & SUMMARY
================================================================================
High-achieving Computer Science sophomore at BNU University with deep architectural
mastery in C++, Object-Oriented Software Design (OOP), and Non-Linear Data Structures.
Competitive programming finalist (ICPC Level 1) with an instinct for algorithmic
complexity (Big-O), memory allocation mechanics, and surgical debugging. Combines
low-level engineering horsepower with commanding technical communication, active
collaboration, and relentless curiosity. Actively pursuing Software Engineering Internships.

================================================================================
ACADEMIC EXCELLENCE
================================================================================
Bachelor of Computer Science & Engineering
BNU University, Egypt | 2024 — 2029 (Expected)
  • Academic Standing : 2nd Year Major (Sophomore Standing)
  • Cumulative GPA   : 3.1 / 4.0 Standing
  • Competitive Rank : ICPC Level 1 Tournament Competitor
  • Core Coursework  : 
      - Programming Fundamentals in C++ (Advanced Level)
      - Object-Oriented Programming & Systems Design (OOP)
      - Linear & Non-Linear Data Structures
      - Discrete Mathematics & Computational Logic
      - Algorithm Design & Complexity Analysis (In-Progress)
      - Computer Organization & Architecture (In-Progress)

================================================================================
TECHNICAL ARSENAL & CORE COMPETENCIES
================================================================================
  • Programming Languages : C++, C (Modern C++17/20, Memory Management, RAII)
  • Architecture & Design : Object-Oriented Programming (Polymorphism, Inheritance,
                            Abstract Interfaces, Encapsulation), Clean Architecture
  • Algorithmic Mastery   : Binary Search Trees (BST), Doubly Linked Lists, Stacks,
                            Queues, Hash Tables, Graphs, Big-O Asymptotic Profiling
  • Development Ecosystem : Git Architecture, GitHub Workflows, Linux Terminal CLI,
                            VS Code, GDB Debugger Tracing
  • Problem Solving       : ICPC Level 1 Competitor, Algorithmic Pattern Recognition

================================================================================
FEATURED SYSTEMS & PROJECTS
================================================================================
[01] Data Structures & Expression Compiler (C++)
     • Architected custom zero-dependency implementations of Doubly Linked Lists,
       Generic Stacks, and recursive Binary Search Trees (BST) from scratch.
     • Implemented Dijkstra's Shunting-Yard arithmetic expression compiler (Infix to Postfix).
     • Built an empirical benchmark profiling suite measuring Big-O runtime against STL.

[02] Academic Registry & Information System (C++, OOP Architecture)
     • Designed an enterprise-style academic registry utilizing clean OOP hierarchies.
     • Implemented polymorphic Person base contracts extended by Student and Instructor.
     • Engineered persistent binary/text stream serialization with input sanitization.

[03] Secure Financial Transaction Engine (C++)
     • Built a transactional banking simulation enforcing atomic balance invariants.
     • Implemented overdraft protection, PIN cryptographic verification, and audit ledgers.

[04] Priority Task Orchestrator & CLI (C++, Data Structures)
     • Developed a high-throughput CLI task organizer driven by priority queues.
     • Implemented heuristic deadline ordering and automated state serialization.

================================================================================
INTERPERSONAL LEADERSHIP & SOFT SKILLS
================================================================================
  • Strategic Technical Articulation : Exhaustive documentation, class diagrams & demos
  • High-Stakes Team Synergy         : ICPC competitive dynamics & constructive code reviews
  • Root-Cause Analytical Precision  : Pointer auditing, memory profiling & edge-case discovery
  • Hyper-Velocity Adaptability      : Voracious self-learner embracing complex toolchains

================================================================================
HONORS & AFFILIATIONS
================================================================================
  • Collegiate ICPC Level 1 Competitive Programming Participant
  • Academic Standing: Cumulative GPA 3.1 / 4.0 — BNU University
================================================================================
`;

  const blob = new Blob([cv], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'Khairy_ElSayed_Executive_Resume_CS_Year2.txt' });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Visual feedback
  const original = cvBtn.innerHTML;
  cvBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    Downloaded!
  `;
  cvBtn.style.color = '#22c55e';
  cvBtn.style.borderColor = '#22c55e';
  setTimeout(() => {
    cvBtn.innerHTML = original;
    cvBtn.style.color = '';
    cvBtn.style.borderColor = '';
  }, 2500);
});