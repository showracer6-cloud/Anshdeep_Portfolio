// --- MOBILE NAVIGATION ---
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#primary-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// --- LIGHT / DARK THEME TOGGLE ---
const themeToggle = document.querySelector("#theme-toggle");
const themeText = document.querySelector(".theme-toggle-text");
const themeIcon = document.querySelector(".theme-toggle-icon");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (e) {}

  if (themeText) {
    themeText.textContent = theme === "dark" ? "Light" : "Dark";
  }
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☼" : "☽";
  }
}

// Initialize theme state from current DOM / localStorage
const initialTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// --- PROJECT SEARCH & FILTERING ---
const searchInput = document.querySelector("#project-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noProjectsMsg = document.querySelector("#no-projects");
const clearSearchBtn = document.querySelector("#clear-search-btn");

let currentCategory = "all";

function filterProjects() {
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const title = (card.getAttribute("data-title") || "").toLowerCase();
    const tech = (card.getAttribute("data-tech") || "").toLowerCase();
    const categories = (card.getAttribute("data-category") || "").toLowerCase().split(" ");
    const textContent = card.textContent.toLowerCase();

    const matchesCategory = currentCategory === "all" || categories.includes(currentCategory);
    const matchesSearch = !query || title.includes(query) || tech.includes(query) || textContent.includes(query);

    if (matchesCategory && matchesSearch) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (noProjectsMsg) {
    noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterProjects);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-filter") || "all";
    filterProjects();
  });
});

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    currentCategory = "all";
    filterButtons.forEach((b) => b.classList.toggle("active", b.getAttribute("data-filter") === "all"));
    filterProjects();
  });
}

// --- JARVIS AI CHATBOT ENGINE ---
const jarvisToggle = document.querySelector("#jarvis-toggle");
const jarvisModal = document.querySelector("#jarvis-modal");
const jarvisClose = document.querySelector("#jarvis-close");
const jarvisForm = document.querySelector("#jarvis-form");
const jarvisInput = document.querySelector("#jarvis-input");
const jarvisMessages = document.querySelector("#jarvis-messages");
const jarvisChips = document.querySelectorAll(".jarvis-chip");

function openJarvis() {
  if (!jarvisModal) return;
  jarvisModal.hidden = false;
  // Trigger animation next tick
  requestAnimationFrame(() => {
    jarvisModal.classList.add("is-open");
  });
  if (jarvisToggle) jarvisToggle.setAttribute("aria-expanded", "true");
  if (jarvisInput) jarvisInput.focus();
}

function closeJarvis() {
  if (!jarvisModal) return;
  jarvisModal.classList.remove("is-open");
  if (jarvisToggle) jarvisToggle.setAttribute("aria-expanded", "false");
  setTimeout(() => {
    if (!jarvisModal.classList.contains("is-open")) {
      jarvisModal.hidden = true;
    }
  }, 250);
}

if (jarvisToggle) {
  jarvisToggle.addEventListener("click", () => {
    if (jarvisModal && jarvisModal.classList.contains("is-open")) {
      closeJarvis();
    } else {
      openJarvis();
    }
  });
}

if (jarvisClose) {
  jarvisClose.addEventListener("click", closeJarvis);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && jarvisModal && jarvisModal.classList.contains("is-open")) {
    closeJarvis();
  }
});

function appendJarvisMessage(text, sender = "bot", isHtml = false) {
  if (!jarvisMessages) return;
  const msgEl = document.createElement("div");
  msgEl.className = `jarvis-msg jarvis-msg-${sender}`;
  if (isHtml) {
    msgEl.innerHTML = text;
  } else {
    msgEl.textContent = text;
  }
  jarvisMessages.appendChild(msgEl);
  jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
}

function showJarvisTyping() {
  if (!jarvisMessages) return null;
  const typingEl = document.createElement("div");
  typingEl.className = "jarvis-msg jarvis-msg-bot jarvis-typing";
  typingEl.innerHTML = "<span></span><span></span><span></span>";
  jarvisMessages.appendChild(typingEl);
  jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
  return typingEl;
}

// Knowledge Base for JARVIS
const PORTFOLIO_KNOWLEDGE = {
  name: "Anshdeep Manocha",
  title: "Student | Aspiring Software Developer",
  college: "JECRC University, Jaipur",
  education: "B.Tech in Computer Science and Engineering, 2nd Year at JECRC University, Jaipur",
  about: "Hi, I'm Anshdeep Manocha, a second-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur. I'm passionate about programming, software development, problem-solving, and exploring new technologies. I enjoy learning by building practical projects and continuously improving my technical skills.",
  skills: [
    "Python",
    "Programming Fundamentals",
    "Problem Solving",
    "HTML",
    "CSS",
    "JavaScript",
    "Git and GitHub",
    "Basic UI Development"
  ],
  projects: [
    {
      title: "Python Programs",
      description: "A collection of Python programming exercises focused on core logic, sequence generation, and Fibonacci series calculations.",
      tech: "Python, Programming Fundamentals, Algorithms",
      github: "https://github.com/showracer6-cloud/Python-code-fibonacci-"
    },
    {
      title: "Python Basic Struct",
      description: "A Python fundamentals project demonstrating dictionary data structures, key-value mapping, and f-string output formatting.",
      tech: "Python, Data Structures, Programming Fundamentals",
      github: "https://github.com/showracer6-cloud/Python-Basics-struct"
    },
    {
      title: "Correcting Grade",
      description: "A programming project for processing student grades, computing class averages, and unit-tested evaluation logic.",
      tech: "Python, Problem Solving, Testing",
      github: "https://github.com/showracer6-cloud/Correcting-Grade"
    },
    {
      title: "Quiz Application",
      description: "An interactive multiple-choice quiz application featuring question progression, dynamic score calculation, and responsive styling.",
      tech: "HTML, CSS, JavaScript, Basic UI Development",
      github: "https://github.com/showracer6-cloud/Quiz-PE"
    },
    {
      title: "Reading List",
      description: "A responsive book-tracking web application allowing users to organize books across reading statuses, filter lists, and view progress summaries.",
      tech: "React, TypeScript, Tailwind CSS, Vite",
      github: "https://github.com/showracer6-cloud/Book-Reading"
    },
    {
      title: "Python Programs — Factorial",
      description: "A Python programming exercise for calculating factorials of positive integers using iterative loop multiplication.",
      tech: "Python, Algorithms, Programming Fundamentals",
      github: "https://github.com/showracer6-cloud/Python-Code-Factorial-"
    }
  ],
  contact: {
    github: "https://github.com/showracer6-cloud/",
    email: "singhmanochaanshdeep@gmail.com",
    linkedin: "https://www.linkedin.com/in/anshdeep-singh-manocha-45b46133b/"
  }
};

// JARVIS Local AI response generator
function generateJarvisResponse(prompt) {
  const p = prompt.toLowerCase().trim();

  // 1. Specific project questions (check before generic project/about matches)
  if (p.includes("fibonacci")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[0];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  if (p.includes("struct") || p.includes("dictionary")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[1];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  if (p.includes("grade") || p.includes("correcting")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[2];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  if (p.includes("quiz")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[3];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  if (p.includes("reading") || p.includes("book")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[4];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  if (p.includes("factorial")) {
    const proj = PORTFOLIO_KNOWLEDGE.projects[5];
    return `<strong>${proj.title}</strong>: ${proj.description}<br><br><strong>Technologies:</strong> ${proj.tech}<br><a href="${proj.github}" target="_blank" rel="noopener noreferrer">View Repository on GitHub ↗</a>`;
  }

  // 2. Experience / Certifications check (must not invent claims)
  if (p.includes("experience") || p.includes("job") || p.includes("internship") || p.includes("certification") || p.includes("certificate") || p.includes("company") || p.includes("worked")) {
    return `Anshdeep is currently a dedicated second-year B.Tech Computer Science student at JECRC University, Jaipur. He has not listed commercial employment or external certifications yet, choosing to focus on mastering programming fundamentals, data structures, and practical coding projects.`;
  }

  // 3. Education / College / Degree
  if (p.includes("education") || p.includes("college") || p.includes("university") || p.includes("degree") || p.includes("jecrc") || p.includes("study") || p.includes("b.tech") || p.includes("btech") || p.includes("which year") || p.includes("what year") || p.includes("current year") || p === "year") {
    return `Anshdeep is currently in his 2nd year pursuing a <strong>B.Tech in Computer Science and Engineering</strong> at <strong>JECRC University, Jaipur</strong>. He focuses on core programming, algorithms, and software development fundamentals.`;
  }

  // 4. Technical Skills
  if (p.includes("skill") || p.includes("tech stack") || p.includes("technologies") || p.includes("language") || p.includes("know")) {
    const skillList = PORTFOLIO_KNOWLEDGE.skills.map((s) => `• ${s}`).join("<br>");
    return `Here are Anshdeep's verified technical skills:<br><br>${skillList}<br><br>These are supported by his coursework and hands-on project repositories.`;
  }

  // 5. Contact
  if (p.includes("contact") || p.includes("reach") || p.includes("email") || p.includes("github") || p.includes("linkedin") || p.includes("hire") || p.includes("message")) {
    return `You can connect with Anshdeep through any of the three official options:<br><br>` +
      `• <strong>GitHub:</strong> <a href="${PORTFOLIO_KNOWLEDGE.contact.github}" target="_blank" rel="noopener noreferrer">github.com/showracer6-cloud ↗</a><br>` +
      `• <strong>Email:</strong> <a href="mailto:${PORTFOLIO_KNOWLEDGE.contact.email}">${PORTFOLIO_KNOWLEDGE.contact.email}</a><br>` +
      `• <strong>LinkedIn:</strong> <a href="${PORTFOLIO_KNOWLEDGE.contact.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/anshdeep-singh-manocha ↗</a>`;
  }

  // 6. All Projects list
  if (p.includes("project") || p.includes("work") || p.includes("repo") || p.includes("portfolio")) {
    const projList = PORTFOLIO_KNOWLEDGE.projects
      .map((proj, i) => `${i + 1}. <strong>${proj.title}</strong> — ${proj.description}`)
      .join("<br><br>");
    return `Anshdeep has 6 featured projects in his portfolio:<br><br>${projList}<br><br>You can explore the cards in the Projects section or ask me about any specific project!`;
  }

  // 7. Identity / About Anshdeep / Greetings
  if (p.includes("who is") || p.includes("about") || p.includes("bio") || p.includes("introduce") || p.includes("tell me") || p.includes("anshdeep")) {
    return `Anshdeep Manocha is a second-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur. He is an aspiring software developer passionate about programming, software development, problem-solving, and exploring new technologies through practical projects.`;
  }

  if (p.includes("hello") || p.includes("hi") || p.includes("hey") || p.includes("greetings")) {
    return "Greetings! I am JARVIS, Anshdeep Manocha's AI portfolio assistant. I can answer questions about his education at JECRC University, technical skills, or his 6 featured projects. What would you like to know?";
  }

  // 8. JARVIS self identity
  if (p.includes("jarvis") || p.includes("who are you") || p.includes("what are you")) {
    return `I am JARVIS, the personal portfolio AI assistant for Anshdeep Manocha. I am programmed to provide verified details about his education, skills, projects, and contact avenues.`;
  }

  // 9. Fallback
  return `Understood. As JARVIS, I can assist you with details regarding Anshdeep Manocha's <strong>education</strong> at JECRC University, his <strong>skills</strong>, his <strong>6 featured projects</strong>, or his <strong>contact</strong> links. Please feel free to ask about any of these topics!`;
}

// Asynchronous handler with optional server-side API integration & graceful fallback
async function handleJarvisQuery(query) {
  const trimmed = query.trim();
  if (!trimmed) return;

  appendJarvisMessage(trimmed, "user");
  if (jarvisInput) jarvisInput.value = "";

  const typingIndicator = showJarvisTyping();

  // If a server-side endpoint `/api/chat` exists, query it safely; otherwise use the local knowledge engine
  let botReply = "";
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      botReply = data.reply || data.message || generateJarvisResponse(trimmed);
    } else {
      botReply = generateJarvisResponse(trimmed);
    }
  } catch (err) {
    // Graceful fallback to local JARVIS knowledge engine (no API key required)
    botReply = generateJarvisResponse(trimmed);
  }

  if (typingIndicator && typingIndicator.parentNode) {
    typingIndicator.parentNode.removeChild(typingIndicator);
  }

  appendJarvisMessage(botReply, "bot", true);
}

if (jarvisForm) {
  jarvisForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (jarvisInput && jarvisInput.value.trim()) {
      handleJarvisQuery(jarvisInput.value);
    }
  });
}

jarvisChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const prompt = chip.getAttribute("data-prompt");
    if (prompt) {
      handleJarvisQuery(prompt);
    }
  });
});
