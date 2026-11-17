document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. TEMA CLARO & ESCURO (Funciona tanto na Tela de Login quanto no Painel)
  // =========================================================================
  const htmlRoot = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const loginThemeToggle = document.getElementById("loginThemeToggle");

  const applyTheme = (theme) => {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("inaula_desktop_theme", theme);

    document.querySelectorAll(".theme-icon-el").forEach((el) => {
      el.textContent = theme === "dark" ? "☀️" : "🌙";
    });
    document.querySelectorAll(".theme-label-el").forEach((el) => {
      el.textContent = theme === "dark" ? "Modo Claro" : "Modo Escuro";
    });
  };

  applyTheme(localStorage.getItem("inaula_desktop_theme") || "light");

  const toggleThemeHandler = () => {
    const next = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  };

  themeToggle?.addEventListener("click", toggleThemeHandler);
  loginThemeToggle?.addEventListener("click", toggleThemeHandler);

  // =========================================================================
  // 2. TRANSIÇÃO TELA DE LOGIN FULLSCREEN <-> PAINEL DESKTOP
  // =========================================================================
  const loginFullscreenOverlay = document.getElementById("loginFullscreenOverlay");
  const mainDesktopApp = document.getElementById("mainDesktopApp");

  const switchStudentMode = document.getElementById("switchStudentMode");
  const switchTeacherMode = document.getElementById("switchTeacherMode");
  const studentNav = document.getElementById("studentNav");
  const teacherNav = document.getElementById("teacherNav");
  const topbarAvatar = document.getElementById("topbarAvatar");
  const topbarName = document.getElementById("topbarName");
  const topbarRole = document.getElementById("topbarRole");
  const topbarPointsBox = document.getElementById("topbarPointsBox");
  const currentViewTitle = document.getElementById("currentViewTitle");
  const currentViewSubtitle = document.getElementById("currentViewSubtitle");

  const viewTitles = {
    "student-home": ["Painel do Estudante", "Bruno Delorence • Turma 3°E • Top 1"],
    "student-activities": ["Atividades & Trilhas Gamificadas", "Complete os níveis e tire dúvidas direto com seu professor"],
    "student-shop": ["Loja de Pontos IN AULA", "Troque seus pontos acumulados por materiais e prêmios"],
    "student-ranking": ["Ranking de Engajamento", "Classificação oficial da Turma 3°E"],
    "student-chat": ["Chat com a Professora Tati", "Canal direto para reforço e dúvidas das atividades"],
    "student-profile": ["Meu Perfil de Estudante", "Dados cadastrais e configurações da conta"],
    "teacher-home": ["Painel Docente — Profª. Tatiane Soma", "Gestão de turmas, lembretes de evasão e reforço escolar"],
    "teacher-attendance": ["Chamada Digital por Turma", "Controle de presença diária e alerta de faltas"],
    "teacher-grades": ["Gestão de Notas & Frequência", "Boletim bimestral dos estudantes da Turma 3C"],
    "teacher-chat": ["Central de Dúvidas dos Alunos", "Atendimento virtual para reforço pedagógico"],
  };

  const showView = (viewId) => {
    document.querySelectorAll(".view-screen").forEach((sec) => {
      const isTarget = sec.id === `view-${viewId}`;
      sec.hidden = !isTarget;
      sec.style.display = isTarget ? "block" : "none";
      sec.classList.toggle("active", isTarget);
    });

    document.querySelectorAll(".sidebar .nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewId);
    });

    if (viewTitles[viewId] && currentViewTitle && currentViewSubtitle) {
      currentViewTitle.textContent = viewTitles[viewId][0];
      currentViewSubtitle.textContent = viewTitles[viewId][1];
    }
  };

  const setRoleMode = (mode) => {
    const isStudent = mode === "student";
    switchStudentMode?.classList.toggle("active", isStudent);
    switchTeacherMode?.classList.toggle("active", !isStudent);
    if (studentNav) {
      studentNav.hidden = !isStudent;
      studentNav.style.display = isStudent ? "flex" : "none";
    }
    if (teacherNav) {
      teacherNav.hidden = isStudent;
      teacherNav.style.display = isStudent ? "none" : "flex";
    }
    if (topbarPointsBox) topbarPointsBox.style.display = isStudent ? "flex" : "none";

    if (isStudent) {
      if (topbarAvatar) topbarAvatar.src = "assets/avatar-bruno.png";
      if (topbarName) topbarName.textContent = "Bruno Delorence";
      if (topbarRole) topbarRole.textContent = "Estudante • Top 1 (3°E)";
      showView("student-home");
    } else {
      if (topbarAvatar) topbarAvatar.src = "assets/avatar-tatiane.png";
      if (topbarName) topbarName.textContent = "Profª. Tatiane Soma";
      if (topbarRole) topbarRole.textContent = "Docente • Matemática & Algoritmos";
      showView("teacher-home");
    }
  };

  const enterDashboard = (mode) => {
    if (loginFullscreenOverlay) {
      loginFullscreenOverlay.hidden = true;
      loginFullscreenOverlay.style.display = "none";
    }
    if (mainDesktopApp) {
      mainDesktopApp.hidden = false;
      mainDesktopApp.style.display = "grid";
    }
    setRoleMode(mode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const returnToLoginScreen = () => {
    if (mainDesktopApp) {
      mainDesktopApp.hidden = true;
      mainDesktopApp.style.display = "none";
    }
    if (loginFullscreenOverlay) {
      loginFullscreenOverlay.hidden = false;
      loginFullscreenOverlay.style.display = "flex";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  switchStudentMode?.addEventListener("click", () => setRoleMode("student"));
  switchTeacherMode?.addEventListener("click", () => setRoleMode("teacher"));

  const subjectsListView = document.getElementById("subjectsListView");
  const subjectDetailView = document.getElementById("subjectDetailView");

  const showSubjectsCatalog = () => {
    if (subjectsListView) {
      subjectsListView.hidden = false;
      subjectsListView.style.display = "block";
    }
    if (subjectDetailView) {
      subjectDetailView.hidden = true;
      subjectDetailView.style.display = "none";
    }
  };

  const showSubjectInsideActivities = () => {
    if (subjectsListView) {
      subjectsListView.hidden = true;
      subjectsListView.style.display = "none";
    }
    if (subjectDetailView) {
      subjectDetailView.hidden = false;
      subjectDetailView.style.display = "block";
    }
  };

  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view");
      showView(target);
      if (target === "student-activities") {
        showSubjectsCatalog();
      }
    });
  });

  document.querySelectorAll("[data-go-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-go-view");
      if (target.startsWith("teacher-")) {
        setRoleMode("teacher");
      } else if (target.startsWith("student-")) {
        setRoleMode("student");
      }
      showView(target);
      if (target === "student-activities") {
        showSubjectsCatalog();
      }
    });
  });

  document.getElementById("openWelcomeBtn")?.addEventListener("click", returnToLoginScreen);
  document.getElementById("sidebarLogoutBtn")?.addEventListener("click", returnToLoginScreen);
  document.getElementById("profileLogoutBtn")?.addEventListener("click", returnToLoginScreen);

  // =========================================================================
  // 3. TELA DE LOGIN, CRIAR CONTA E ESQUECEU A SENHA (Figma 21:139, 16:56, 16:269, 16:250)
  // =========================================================================
  let chosenProfile = "estudante";
  const selectedProfileBadge = document.getElementById("selectedProfileBadge");
  const loginUser = document.getElementById("loginUser");
  const signupUsername = document.getElementById("signupUsername");
  const signupEmail = document.getElementById("signupEmail");

  const profilePresets = {
    responsaveis: {
      label: "RESPONSÁVEIS",
      user: "responsavel.bruno@gmail.com",
      username: "responsavel.bruno",
      mode: "student",
    },
    estudante: {
      label: "ESTUDANTE",
      user: "brunodelorence@gmail.com",
      username: "brunodelorence",
      mode: "student",
    },
    instituicao: {
      label: "INSTITUIÇÃO / PROFESSOR",
      user: "tatianesoma@gmail.com",
      username: "Tatiane Soma",
      mode: "teacher",
    },
  };

  document.querySelectorAll("[data-select-profile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-select-profile]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      chosenProfile = btn.getAttribute("data-select-profile") || "estudante";
      const preset = profilePresets[chosenProfile] || profilePresets.estudante;

      if (selectedProfileBadge) {
        selectedProfileBadge.innerHTML = `Perfil: <strong>${preset.label}</strong>`;
      }
      if (loginUser) loginUser.value = preset.user;
      if (signupUsername) signupUsername.value = preset.username;
      if (signupEmail) signupEmail.value = preset.user;
    });
  });

  const switchAuthTab = (tabName) => {
    document.querySelectorAll("[data-auth-tab]").forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-auth-tab") === tabName);
    });
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const recoverForm = document.getElementById("recoverForm");

    if (loginForm) {
      loginForm.hidden = tabName !== "login";
      loginForm.style.display = tabName === "login" ? "block" : "none";
    }
    if (signupForm) {
      signupForm.hidden = tabName !== "signup";
      signupForm.style.display = tabName === "signup" ? "block" : "none";
    }
    if (recoverForm) {
      recoverForm.hidden = tabName !== "recover";
      recoverForm.style.display = tabName === "recover" ? "block" : "none";
    }
  };

  document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchAuthTab(btn.getAttribute("data-auth-tab")));
  });

  document.querySelectorAll("[data-auth-switch]").forEach((btn) => {
    btn.addEventListener("click", () => switchAuthTab(btn.getAttribute("data-auth-switch")));
  });

  document.getElementById("authBackArrowBtn")?.addEventListener("click", () => {
    switchAuthTab("login");
  });

  // Botão Olho (Mostrar/Ocultar Senha)
  document.querySelectorAll("[data-toggle-pass]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle-pass");
      const input = document.getElementById(targetId);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // Função direta de Login / Cadastro
  const handleAuthAccess = (e) => {
    if (e) e.preventDefault();
    const userVal = (document.getElementById("loginUser")?.value || "").toLowerCase();
    if (userVal.includes("tatiane") || userVal.includes("prof") || chosenProfile === "instituicao") {
      enterDashboard("teacher");
    } else {
      const preset = profilePresets[chosenProfile] || profilePresets.estudante;
      enterDashboard(preset.mode);
    }
  };

  // Submit Login
  document.getElementById("loginForm")?.addEventListener("submit", handleAuthAccess);
  document.querySelector("#loginForm .figma-submit-btn")?.addEventListener("click", handleAuthAccess);

  // Submit Criar Conta
  document.getElementById("signupForm")?.addEventListener("submit", handleAuthAccess);
  document.querySelector("#signupForm .figma-submit-btn")?.addEventListener("click", handleAuthAccess);

  // Submit Esqueceu a Senha
  document.getElementById("recoverForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const recoverFeedbackMsg = document.getElementById("recoverFeedbackMsg");
    const emailVal = document.getElementById("recoverEmailInput")?.value || "";
    if (recoverFeedbackMsg) {
      recoverFeedbackMsg.textContent = `✅ Link de redefinição enviado para ${emailVal}!`;
    }
    setTimeout(() => {
      if (recoverFeedbackMsg) recoverFeedbackMsg.textContent = "";
      switchAuthTab("login");
    }, 2500);
  });

  // =========================================================================
  // 4. PONTOS DO ESTUDANTE, ATIVIDADES & QUIZ DE ÂNGULOS (Figma 16:582, 24:3046)
  // =========================================================================
  let studentPoints = 2564;
  let studyProgress = 20;
  const globalStudentPoints = document.getElementById("globalStudentPoints");
  const studyProgressLabel = document.getElementById("studyProgressLabel");
  const studyProgressBar = document.getElementById("studyProgressBar");

  const updatePointsDisplay = () => {
    if (globalStudentPoints) {
      globalStudentPoints.textContent = String(studentPoints);
    }
  };

  const activitySearchInput = document.getElementById("activitySearchInput");
  activitySearchInput?.addEventListener("input", () => {
    const query = activitySearchInput.value.toLowerCase().trim();
    document.querySelectorAll("#subjectsGrid .subject-card").forEach((card) => {
      const subject = (card.getAttribute("data-subject") || "").toLowerCase();
      card.style.display = subject.includes(query) ? "" : "none";
    });
  });

  const selectedSubjectHeading = document.getElementById("selectedSubjectHeading");
  const subjectDetailCounterBadge = document.getElementById("subjectDetailCounterBadge");
  const quizBannerTitle = document.getElementById("quizBannerTitle");
  const backToSubjectsBtn = document.getElementById("backToSubjectsBtn");

  const subjectMetaMap = {
    Matemática: { counter: "03/30", firstLevel: "Soma" },
    Português: { counter: "0/30", firstLevel: "Soma" },
    Biologia: { counter: "07/30", firstLevel: "Soma" },
    Química: { counter: "16/30", firstLevel: "Soma" },
    Física: { counter: "18/30", firstLevel: "Soma" },
    Inglês: { counter: "22/30", firstLevel: "Soma" },
    História: { counter: "09/30", firstLevel: "Soma" },
  };

  backToSubjectsBtn?.addEventListener("click", () => {
    showSubjectsCatalog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll("[data-subject], [data-open-subject]").forEach((card) => {
    card.addEventListener("click", () => {
      const subj = card.getAttribute("data-subject") || card.getAttribute("data-open-subject") || "Matemática";
      const meta = subjectMetaMap[subj] || { counter: "03/30" };

      showView("student-activities");
      showSubjectInsideActivities();

      if (selectedSubjectHeading) {
        selectedSubjectHeading.textContent = `Trilha: ${subj} (${meta.counter})`;
      }
      if (subjectDetailCounterBadge) {
        subjectDetailCounterBadge.textContent = `Matéria: ${subj} • Progresso: ${meta.counter}`;
      }
      if (quizBannerTitle) {
        quizBannerTitle.textContent = `${subj} — Desafio`;
      }
      if (quizFeedbackMsg) {
        quizFeedbackMsg.textContent = "";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const levelQuestions = {
    Soma: {
      title: "Soma",
      question: "Some o ângulo por eles mesmo (36° + 36°):",
      options: ["45º", "55º", "71º", "72º"],
      correctIndex: 3,
    },
    Subtração: {
      title: "Subtração",
      question: "Qual é o suplemento de 108° (180° - 108°)?",
      options: ["62º", "72º", "82º", "90º"],
      correctIndex: 1,
    },
    Divisão: {
      title: "Divisão",
      question: "Divida o ângulo de 36° ao meio (bissetriz):",
      options: ["12º", "16º", "18º", "24º"],
      correctIndex: 2,
    },
    Multiplicação: {
      title: "Multiplicação",
      question: "Qual é o triplo do ângulo de 36°?",
      options: ["96º", "108º", "112º", "120º"],
      correctIndex: 1,
    },
  };

  const quizQuestionText = document.getElementById("quizQuestionText");
  const quizOptionsGrid = document.getElementById("quizOptionsGrid");
  const quizFeedbackMsg = document.getElementById("quizFeedbackMsg");

  const bindQuizButtons = () => {
    quizOptionsGrid?.querySelectorAll(".quiz-option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-correct") === "true";
        quizOptionsGrid.querySelectorAll(".quiz-option-btn").forEach((b) => {
          b.classList.remove("correct", "wrong");
        });

        if (isCorrect) {
          btn.classList.add("correct");
          studentPoints += 50;
          studyProgress = Math.min(100, studyProgress + 10);
          updatePointsDisplay();
          if (studyProgressLabel && studyProgressBar) {
            studyProgressLabel.textContent = `${studyProgress}% de seu progresso!`;
            studyProgressBar.style.width = `${studyProgress}%`;
          }
          if (quizFeedbackMsg) {
            quizFeedbackMsg.style.color = "#16a34a";
            quizFeedbackMsg.textContent = "🎉 Resposta correta! Você ganhou +50 pts no IN AULA!";
          }
        } else {
          btn.classList.add("wrong");
          if (quizFeedbackMsg) {
            quizFeedbackMsg.style.color = "#dc2626";
            quizFeedbackMsg.textContent = "🤔 Quase lá! Tente outra alternativa ou envie sua dúvida à Professora Tati abaixo.";
          }
        }
      });
    });
  };

  bindQuizButtons();

  document.querySelectorAll(".level-tile-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".level-tile-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const levelName = btn.getAttribute("data-level");
      const qData = levelQuestions[levelName] || {
        title: levelName,
        question: `Desafio de ${levelName}: Considerando o ângulo de 36°, qual o dobro desse valor?`,
        options: ["45º", "55º", "71º", "72º"],
        correctIndex: 3,
      };

      if (quizBannerTitle) quizBannerTitle.textContent = qData.title;
      if (quizQuestionText) quizQuestionText.textContent = qData.question;
      if (quizFeedbackMsg) quizFeedbackMsg.textContent = "";

      if (quizOptionsGrid) {
        quizOptionsGrid.innerHTML = qData.options
          .map(
            (opt, idx) =>
              `<button type="button" class="quiz-option-btn" data-correct="${idx === qData.correctIndex}">${opt}</button>`
          )
          .join("");
        bindQuizButtons();
      }
    });
  });

  // =========================================================================
  // 5. LOJA DE RECOMPENSAS (16 Produtos Oficiais do Figma 24:4419)
  // =========================================================================
  const shopProducts = [
    { name: "Caderno", pts: 10, cat: "objeto", bg: "#a4deff", img: "assets/shop-caderno.png" },
    { name: "Mochila", pts: 25, cat: "objeto", bg: "rgba(64,154,186,0.45)", img: "assets/shop-mochila.png" },
    { name: "Fones de ouvido", pts: 50, cat: "eletronicos", bg: "rgba(0,149,255,0.22)", img: "assets/shop-fones.png" },
    { name: "Notebook", pts: 800, cat: "eletronicos", bg: "rgba(183,223,245,0.35)", img: "assets/shop-notebook.png" },
    { name: "Tênis nike", pts: 100, cat: "objeto", bg: "rgba(202,247,147,0.35)", img: "assets/shop-tenis.png" },
    { name: "Camiseta Addidas", pts: 150, cat: "objeto", bg: "rgba(187,45,240,0.22)", img: "assets/shop-camiseta.png" },
    { name: "Calça Supreme", pts: 120, cat: "objeto", bg: "rgba(239,185,11,0.25)", img: "assets/shop-calca.png" },
    { name: "Cd Victor e Leo", pts: 500, cat: "objeto", bg: "rgba(216,17,10,0.22)", img: "assets/shop-cd.png" },
    { name: "DVD Crepúsculo", pts: 520, cat: "objeto", bg: "rgba(83,52,7,0.22)", img: "assets/shop-dvd.png" },
    { name: "Blur ay", pts: 415, cat: "eletronicos", bg: "rgba(211,176,224,0.35)", img: "assets/shop-bluray.png" },
    { name: "Ps3 desbloqueado", pts: 3000, cat: "eletronicos", bg: "rgba(253,229,152,0.35)", img: "assets/shop-ps3.png" },
    { name: "Vale presente", pts: 80, cat: "objeto", bg: "rgba(24,216,149,0.25)", img: "assets/shop-vale.png" },
    { name: "Cesta básica", pts: 65, cat: "objeto", bg: "rgba(247,165,147,0.3)", img: "assets/shop-cesta.png" },
    { name: "coca-cola", pts: 40, cat: "objeto", bg: "rgba(205,7,178,0.22)", img: "assets/shop-coca.png" },
    { name: "Ovo de páscoa", pts: 25, cat: "objeto", bg: "rgba(253,229,152,0.35)", img: "assets/shop-ovo.png" },
    { name: "Canetinhas", pts: 5, cat: "objeto", bg: "rgba(183,223,245,0.35)", img: "assets/shop-canetinhas.png" },
  ];

  let activeShopCategory = "all";
  const shopProductsGrid = document.getElementById("shopProductsGrid");
  const shopSearchInput = document.getElementById("shopSearchInput");
  const shopFeedbackMsg = document.getElementById("shopFeedbackMsg");

  const renderShopProducts = () => {
    if (!shopProductsGrid) return;
    const query = (shopSearchInput?.value || "").toLowerCase().trim();

    const filtered = shopProducts.filter((item) => {
      const matchCat = activeShopCategory === "all" || item.cat === activeShopCategory;
      const matchQuery = item.name.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    shopProductsGrid.innerHTML = filtered
      .map(
        (item) => `
        <article class="shop-item-card" style="background: ${item.bg}">
          <img src="${item.img}" alt="${item.name}" class="shop-item-card__img" />
          <h4 class="shop-item-card__name">${item.name}</h4>
          <p class="shop-item-card__pts">${item.pts} pts</p>
          <button type="button" class="shop-redeem-btn" data-name="${item.name}" data-pts="${item.pts}">
            Resgatar Prêmio
          </button>
        </article>
      `
      )
      .join("");

    shopProductsGrid.querySelectorAll(".shop-redeem-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cost = Number(btn.getAttribute("data-pts"));
        const prodName = btn.getAttribute("data-name");

        if (studentPoints >= cost) {
          studentPoints -= cost;
          updatePointsDisplay();
          if (shopFeedbackMsg) {
            shopFeedbackMsg.style.color = "#16a34a";
            shopFeedbackMsg.textContent = `🎁 Parabéns! Você resgatou "${prodName}" por ${cost} pts! Saldo atual: ${studentPoints} pts.`;
          }
        } else if (shopFeedbackMsg) {
          shopFeedbackMsg.style.color = "#dc2626";
          shopFeedbackMsg.textContent = `⚠️ Saldo insuficiente para "${prodName}" (${cost} pts). Conclua mais atividades para ganhar pontos!`;
        }
      });
    });
  };

  renderShopProducts();

  shopSearchInput?.addEventListener("input", renderShopProducts);
  document.querySelectorAll("[data-shop-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-shop-cat]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeShopCategory = btn.getAttribute("data-shop-cat");
      renderShopProducts();
    });
  });

  // =========================================================================
  // 6. RANKING DA TURMA (Figma 34:805)
  // =========================================================================
  const rankingEntries = [
    { pos: "04", name: "Jessica Anderson", pts: 992, avatar: "assets/avatar-rank4.png", up: true },
    { pos: "05", name: "Sophia Anderson", pts: 777, avatar: "assets/avatar-rank5.png", up: false },
    { pos: "06", name: "Ethan Carter", pts: 448, avatar: "assets/avatar-rank6.png", up: true },
    { pos: "07", name: "Liam Johnson", pts: 580, avatar: "assets/avatar-rank7.png", up: true },
    { pos: "07", name: "Oliver Smith", pts: 580, avatar: "assets/avatar-rank8.png", up: false },
    { pos: "08", name: "Rebeca Anderson", pts: 584, avatar: "assets/avatar-rank5.png", up: false },
    { pos: "09", name: "Jean Carter", pts: 448, avatar: "assets/avatar-rank6.png", up: true },
    { pos: "10", name: "Whillyan Johnson", pts: 580, avatar: "assets/avatar-rank7.png", up: true },
    { pos: "11", name: "Guilherme Smith", pts: 580, avatar: "assets/avatar-rank8.png", up: false },
    { pos: "12", name: "Samantha Atilho", pts: 584, avatar: "assets/avatar-rank4.png", up: false },
    { pos: "13", name: "Heryk Carter", pts: 448, avatar: "assets/avatar-rank6.png", up: true },
    { pos: "14", name: "Enrique Johnson", pts: 446, avatar: "assets/avatar-rank7.png", up: true },
    { pos: "15", name: "Luiz Smith", pts: 446, avatar: "assets/avatar-rank8.png", up: false },
    { pos: "16", name: "Samila lizboa", pts: 445, avatar: "assets/avatar-rank4.png", up: false },
  ];

  const leaderboardList = document.getElementById("leaderboardList");
  const renderLeaderboard = (multiplier = 1) => {
    if (!leaderboardList) return;
    leaderboardList.innerHTML = rankingEntries
      .map(
        (r) => `
        <div class="leaderboard-row">
          <div class="leaderboard-row__left">
            <span class="leaderboard-pos">${r.pos}</span>
            <img src="${r.avatar}" alt="${r.name}" class="leaderboard-avatar" />
            <div>
              <div class="leaderboard-name">${r.name}</div>
              <div class="leaderboard-points">${Math.round(r.pts * multiplier)} points</div>
            </div>
          </div>
          <span class="trend-badge ${r.up ? "trend--up" : "trend--down"}">${r.up ? "▲" : "▼"}</span>
        </div>
      `
      )
      .join("");
  };

  renderLeaderboard(1);

  document.querySelectorAll("[data-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-period]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const p = btn.getAttribute("data-period");
      const mult = p === "mes" ? 3.2 : p === "semana" ? 1.5 : 1;
      renderLeaderboard(mult);
    });
  });

  // =========================================================================
  // 7. CHAT SINCRONIZADO ALUNO <-> PROFESSORA TATI (Figma 24:911 & 101:922)
  // =========================================================================
  const conversations = [
    {
      id: "bruno",
      studentName: "Bruno Dolarence",
      topic: "Atividade de Operações",
      time: "2m",
      avatar: "assets/avatar-bruno.png",
      unread: true,
      messages: [
        { from: "student", text: "Professora, como faço a soma de dois números?" },
        { from: "teacher", text: "Basta pegar a quantidade e contar mais a outra!!" },
        { from: "student", text: "Verdade! Havia esquecido! Obrigado!!! :D" },
        { from: "teacher", text: "Por nada, qualquer outra dúvida é só chamar." },
        { from: "student", text: "Tá bom professora, você é a melhor!" },
        { from: "teacher", text: "Muito obrigado! Você também é um ótimo aluno." },
      ],
    },
    {
      id: "david",
      studentName: "David",
      topic: "Atividade de Operações",
      time: "5m",
      avatar: "assets/avatar-david.png",
      unread: true,
      messages: [
        { from: "student", text: "Professora Tati, fiquei com dúvida na soma dos ângulos de 36°." },
      ],
    },
    {
      id: "theresa",
      studentName: "Theresa",
      topic: "Atividade de Operações",
      time: "8m",
      avatar: "assets/avatar-theresa.png",
      unread: true,
      messages: [
        { from: "student", text: "Posso entregar a lista de revisão até amanhã?" },
      ],
    },
    {
      id: "marvin",
      studentName: "Marvin",
      topic: "Atividade de Operações",
      time: "30m",
      avatar: "assets/avatar-marvin.png",
      unread: true,
      messages: [
        { from: "student", text: "Não entendi o exercício 4 da trilha de Matemática." },
      ],
    },
    {
      id: "devon",
      studentName: "Devon Lane",
      topic: "Atividade de Equações",
      time: "58m",
      avatar: "assets/avatar-devon.png",
      unread: false,
      messages: [
        { from: "student", text: "Obrigado pela explicação de Equações de 1º grau!" },
        { from: "teacher", text: "Excelente evolução, Devon! Continue praticando." },
      ],
    },
    {
      id: "eleanor",
      studentName: "Eleanor Pena",
      topic: "Atividade de Operações",
      time: "17h",
      avatar: "assets/avatar-eleanor.png",
      unread: false,
      messages: [
        { from: "student", text: "Concluí todos os níveis da semana!" },
        { from: "teacher", text: "Parabéns, Eleanor!" },
      ],
    },
  ];

  let activeConversationId = "bruno";
  const studentChatMessages = document.getElementById("studentChatMessages");
  const teacherInboxList = document.getElementById("teacherInboxList");
  const teacherChatMessages = document.getElementById("teacherChatMessages");
  const teacherUnreadBadge = document.getElementById("teacherUnreadBadge");
  const filterUnrepliedCheck = document.getElementById("filterUnrepliedCheck");

  const renderStudentChat = () => {
    if (!studentChatMessages) return;
    const brunoConv = conversations.find((c) => c.id === "bruno");
    if (!brunoConv) return;

    studentChatMessages.innerHTML = brunoConv.messages
      .map(
        (m) => `
        <div class="chat-bubble ${m.from === "student" ? "chat-bubble--incoming" : "chat-bubble--outgoing"}">
          ${m.text}
        </div>
      `
      )
      .join("");
    studentChatMessages.scrollTop = studentChatMessages.scrollHeight;
  };

  const renderTeacherChat = () => {
    if (!teacherInboxList || !teacherChatMessages) return;
    const onlyUnreplied = filterUnrepliedCheck?.checked;

    const unreadCount = conversations.filter((c) => c.unread).length;
    if (teacherUnreadBadge) {
      teacherUnreadBadge.textContent = String(unreadCount);
    }

    const visibleList = conversations.filter((c) => (!onlyUnreplied ? true : c.unread));
    teacherInboxList.innerHTML = visibleList
      .map(
        (c) => `
        <div class="inbox-item ${c.unread ? "unread" : ""} ${c.id === activeConversationId ? "active" : ""}" data-conv-id="${c.id}">
          ${c.unread ? '<span class="inbox-dot"></span>' : ""}
          <img src="${c.avatar}" alt="${c.studentName}" class="inbox-avatar" />
          <div class="inbox-info">
            <strong>${c.studentName}</strong>
            <span>${c.topic}</span>
          </div>
          <span class="inbox-time">${c.time}</span>
        </div>
      `
      )
      .join("");

    teacherInboxList.querySelectorAll(".inbox-item").forEach((item) => {
      item.addEventListener("click", () => {
        activeConversationId = item.getAttribute("data-conv-id");
        renderTeacherChat();
      });
    });

    const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];
    if (activeConv) {
      document.getElementById("activeChatStudentAvatar").src = activeConv.avatar;
      document.getElementById("activeChatStudentName").textContent = activeConv.studentName;
      document.getElementById("activeChatStudentTopic").textContent = `${activeConv.topic} • Turma 3C`;

      teacherChatMessages.innerHTML = activeConv.messages
        .map(
          (m) => `
          <div class="chat-bubble ${m.from === "student" ? "chat-bubble--incoming" : "chat-bubble--outgoing"}">
            ${m.text}
          </div>
        `
        )
        .join("");
      teacherChatMessages.scrollTop = teacherChatMessages.scrollHeight;
    }
  };

  renderStudentChat();
  renderTeacherChat();

  filterUnrepliedCheck?.addEventListener("change", renderTeacherChat);

  document.getElementById("studentChatForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("studentChatInput");
    const text = input.value.trim();
    if (!text) return;

    const brunoConv = conversations.find((c) => c.id === "bruno");
    brunoConv.messages.push({ from: "student", text });
    brunoConv.unread = true;
    brunoConv.time = "agora";
    input.value = "";
    renderStudentChat();
    renderTeacherChat();
  });

  document.getElementById("activityDoubtForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("activityDoubtInput");
    const text = input.value.trim();
    if (!text) return;

    const brunoConv = conversations.find((c) => c.id === "bruno");
    brunoConv.messages.push({ from: "student", text });
    brunoConv.unread = true;
    brunoConv.time = "agora";
    input.value = "";
    renderStudentChat();
    renderTeacherChat();
    showView("student-chat");
  });

  document.getElementById("teacherChatForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("teacherChatInput");
    const text = input.value.trim();
    if (!text) return;

    const activeConv = conversations.find((c) => c.id === activeConversationId);
    if (activeConv) {
      activeConv.messages.push({ from: "teacher", text });
      activeConv.unread = false;
      input.value = "";
      renderTeacherChat();
      renderStudentChat();
    }
  });

  // =========================================================================
  // 8. CHAMADA DIGITAL & NOTAS DA TURMA 3C (Figma 107:1587, 111:1709, 111:2201)
  // =========================================================================
  const class3CStudents = [
    { num: "#1", name: "Agnaldo Abreu", avatar: "assets/avatar-wilson.png", present: true },
    { num: "#2", name: "Bruno Dolarence", avatar: "assets/avatar-bruno.png", present: true },
    { num: "#3", name: "Caroço Demanga", avatar: "assets/avatar-david.png", present: true },
    { num: "#4", name: "Darley Deley", avatar: "assets/avatar-marvin.png", present: false },
    { num: "#5", name: "Edmundo Cabrito", avatar: "assets/avatar-devon.png", present: true },
    { num: "#6", name: "Ferdinando Propolis", avatar: "assets/avatar-wilson.png", present: true },
    { num: "#7", name: "Groot Darvore", avatar: "assets/avatar-david.png", present: true },
    { num: "#8", name: "Henrique Alves", avatar: "assets/avatar-marvin.png", present: true },
    { num: "#9", name: "Irineu Nemeu", avatar: "assets/avatar-devon.png", present: true },
    { num: "#10", name: "Jozué Barbosa", avatar: "assets/avatar-bruno.png", present: true },
  ];

  const attendanceList = document.getElementById("attendanceList");
  const renderAttendance = () => {
    if (!attendanceList) return;
    attendanceList.innerHTML = class3CStudents
      .map(
        (s, idx) => `
        <label class="student-row-card">
          <div class="student-row-card__left">
            <img src="${s.avatar}" alt="${s.name}" class="student-row-card__avatar" />
            <span class="student-row-card__num">${s.num}</span>
            <span class="student-row-card__name">${s.name}</span>
          </div>
          <input type="checkbox" class="attendance-circle-check" data-idx="${idx}" ${s.present ? "checked" : ""} />
        </label>
      `
      )
      .join("");
  };

  renderAttendance();

  document.querySelectorAll("#attendanceClassSelector .turma-select-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#attendanceClassSelector .turma-select-item").forEach((b) => {
        b.classList.remove("active");
        const box = b.querySelector(".turma-checkbox");
        if (box) box.textContent = "";
      });
      btn.classList.add("active");
      const box = btn.querySelector(".turma-checkbox");
      if (box) box.textContent = "✓";
      const turmaName = btn.getAttribute("data-turma");
      document.getElementById("attendanceHeaderTitle").textContent = `Chamada: ${turmaName}`;
    });
  });

  document.getElementById("saveAttendanceBtn")?.addEventListener("click", () => {
    const feedback = document.getElementById("attendanceFeedbackMsg");
    if (feedback) {
      feedback.textContent = "✅ Chamada registrada com sucesso! Relatório de frequência sincronizado com a coordenação.";
      setTimeout(() => {
        feedback.textContent = "";
      }, 5000);
    }
  });

  const studentGradesData = [
    { subject: "Mat", freq: "90%", grade: "8,1" },
    { subject: "Port", freq: "85%", grade: "8,4" },
    { subject: "Geo", freq: "93%", grade: "7,2" },
    { subject: "Bio", freq: "89%", grade: "6,1" },
    { subject: "Fis", freq: "98%", grade: "9,0" },
    { subject: "qic", freq: "99,9%", grade: "9,6" },
    { subject: "Hist", freq: "86%", grade: "8,5" },
    { subject: "Eng", freq: "84%", grade: "8,8" },
    { subject: "art", freq: "76%", grade: "9,3" },
    { subject: "Mus", freq: "81%", grade: "4,1" },
  ];

  const gradesStudentPicker = document.getElementById("gradesStudentPicker");
  const teacherGradesTableBody = document.getElementById("teacherGradesTableBody");
  const gradesSelectedStudentTitle = document.getElementById("gradesSelectedStudentTitle");

  if (gradesStudentPicker) {
    gradesStudentPicker.innerHTML = class3CStudents
      .slice(0, 8)
      .map(
        (s) => `
        <div class="student-row-card" style="cursor:pointer" data-student-grade="${s.name}">
          <div class="student-row-card__left">
            <img src="${s.avatar}" alt="${s.name}" class="student-row-card__avatar" />
            <span class="student-row-card__num">${s.num}</span>
            <span class="student-row-card__name">${s.name}</span>
          </div>
          <span>→</span>
        </div>
      `
      )
      .join("");

    gradesStudentPicker.querySelectorAll("[data-student-grade]").forEach((row) => {
      row.addEventListener("click", () => {
        const name = row.getAttribute("data-student-grade");
        if (gradesSelectedStudentTitle) {
          gradesSelectedStudentTitle.textContent = `Notas: ${name}`;
        }
      });
    });
  }

  if (teacherGradesTableBody) {
    teacherGradesTableBody.innerHTML = studentGradesData
      .map(
        (row) => `
        <tr>
          <td><span class="row-bar"></span><strong>${row.subject}</strong></td>
          <td>${row.freq}</td>
          <td><input type="text" class="grade-input" value="${row.grade}" /></td>
        </tr>
      `
      )
      .join("");
  }

  document.getElementById("saveGradesBtn")?.addEventListener("click", () => {
    const feedback = document.getElementById("gradesFeedbackMsg");
    if (feedback) {
      feedback.textContent = "✅ Boletim atualizado com sucesso no sistema IN AULA!";
      setTimeout(() => {
        feedback.textContent = "";
      }, 5000);
    }
  });

  document.getElementById("studentProfileForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("profileSavedFeedback");
    if (msg) {
      msg.textContent = "✅ Dados do perfil atualizados com sucesso!";
      setTimeout(() => {
        msg.textContent = "";
      }, 4000);
    }
  });
});
