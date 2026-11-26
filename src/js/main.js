document.addEventListener("DOMContentLoaded", () => {
  const raizHtml = document.documentElement;
  const botaoAlternarTema = document.getElementById("botaoAlternarTema");
  const alternarTemaLogin = document.getElementById("alternarTemaLogin");
  const aplicarTema = (tema) => {
    const temaNormalizado = tema === "escuro" || tema === "dark" ? "escuro" : "claro";
    raizHtml.setAttribute("data-tema", temaNormalizado);
    localStorage.setItem("inaula_tema_computador", temaNormalizado);
    document.querySelectorAll(".elemento-icone-tema").forEach((elemento) => { elemento.textContent = temaNormalizado === "escuro" ? "☀️" : "🌙"; });
    document.querySelectorAll(".elemento-rotulo-tema").forEach((elemento) => { elemento.textContent = temaNormalizado === "escuro" ? "Modo Claro" : "Modo Escuro"; });
    const caminhoLogo = temaNormalizado === "escuro" ? "assets/logo-inaula-dark.png" : "assets/logo-inaula.png";
    document.querySelectorAll('img[src*="logo-inaula"]').forEach((imagem) => { imagem.src = caminhoLogo; });
  };
  aplicarTema(localStorage.getItem("inaula_tema_computador") || "claro");
  const manipularAlternanciaTema = () => { const proximoTema = raizHtml.getAttribute("data-tema") === "escuro" ? "claro" : "escuro"; aplicarTema(proximoTema); };
  botaoAlternarTema?.addEventListener("click", manipularAlternanciaTema);
  alternarTemaLogin?.addEventListener("click", manipularAlternanciaTema);
  const sobreposicaoTelaCheiaLogin = document.getElementById("sobreposicaoTelaCheiaLogin");
  const aplicacaoPrincipalComputador = document.getElementById("aplicacaoPrincipalComputador");
  const seloSetorEstudanteAtivo = document.getElementById("seloSetorEstudanteAtivo");
  const rotuloSetorEstudanteAtivo = document.getElementById("rotuloSetorEstudanteAtivo");
  const seloSetorProfessoraAtivo = document.getElementById("seloSetorProfessoraAtivo");
  const navegacaoEstudante = document.getElementById("navegacaoEstudante");
  const navegacaoProfessora = document.getElementById("navegacaoProfessora");
  const avatarBarraTopo = document.getElementById("avatarBarraTopo");
  const nomeBarraTopo = document.getElementById("nomeBarraTopo");
  const cargoBarraTopo = document.getElementById("cargoBarraTopo");
  const caixaPontosTopo = document.getElementById("caixaPontosTopo");
  const tituloTelaAtual = document.getElementById("tituloTelaAtual");
  const subtituloTelaAtual = document.getElementById("subtituloTelaAtual");
  let setorAutenticado = null;
  const titulosTelas = {
    "estudante-inicio": ["Painel do Estudante", "Bruno Delorence • Turma 3°E • 1º Lugar"], "estudante-atividades": [ "Atividades e Trilhas Gamificadas", "Complete os níveis e tire dúvidas direto com seu professor", ], "estudante-loja": [ "Loja de Pontos IN AULA", "Troque seus pontos acumulados por materiais e prêmios", ], "estudante-classificacao": [ "Classificação de Engajamento", "Classificação oficial da Turma 3°E", ], "estudante-conversa": [ "Conversa com a Professora Tati", "Canal direto para reforço e dúvidas das atividades", ], "estudante-perfil": [ "Meu Perfil de Estudante", "Dados cadastrais e configurações da conta", ], "professora-inicio": [ "Painel Docente — Profª. Tatiane Soma", "Gestão de turmas, lembretes de evasão e reforço escolar", ], "professora-chamada": [ "Chamada Digital por Turma", "Controle de presença diária e alerta de faltas", ], "professora-notas": [ "Gestão de Notas e Frequência", "Boletim bimestral dos estudantes da Turma 3C", ], "professora-conversa": [ "Central de Dúvidas dos Alunos", "Atendimento virtual para reforço pedagógico", ], };
  const mostrarTela = (identificadorTela) => {
    if (
      identificadorTela && identificadorTela.startsWith("professora-") && setorAutenticado !== "instituicao"
    ) { return; }
    if (
      identificadorTela && identificadorTela.startsWith("estudante-") && setorAutenticado === "instituicao"
    ) { return; }
    document.querySelectorAll(".tela-visualizacao").forEach((secao) => {
      const ehAlvo = secao.id === `tela-${identificadorTela}`;
      secao.hidden = !ehAlvo;
      secao.style.display = ehAlvo ? "flex" : "none";
      secao.classList.toggle("ativo", ehAlvo);
    });
    document.querySelectorAll(".barra-lateral .item-navegacao").forEach((botao) => { botao.classList.toggle("ativo", botao.getAttribute("data-tela") === identificadorTela); });
    if (titulosTelas[identificadorTela] && tituloTelaAtual && subtituloTelaAtual) { tituloTelaAtual.textContent = titulosTelas[identificadorTela][0]; subtituloTelaAtual.textContent = titulosTelas[identificadorTela][1]; }
  };
  const definirModoPerfil = (modo) => {
    const modoEfetivo = modo === "professora" && setorAutenticado === "instituicao" ? "professora" : "estudante";
    const ehEstudante = modoEfetivo === "estudante";
    if (seloSetorEstudanteAtivo) {
      seloSetorEstudanteAtivo.hidden = !ehEstudante;
      seloSetorEstudanteAtivo.style.display = ehEstudante ? "flex" : "none";
      if (rotuloSetorEstudanteAtivo) { rotuloSetorEstudanteAtivo.textContent = setorAutenticado === "responsaveis" ? "Setor: Responsáveis" : "Setor: Estudante"; }
    }
    if (seloSetorProfessoraAtivo) { seloSetorProfessoraAtivo.hidden = ehEstudante; seloSetorProfessoraAtivo.style.display = ehEstudante ? "none" : "flex"; }
    if (navegacaoEstudante) { navegacaoEstudante.hidden = !ehEstudante; navegacaoEstudante.style.display = ehEstudante ? "flex" : "none"; }
    if (navegacaoProfessora) { navegacaoProfessora.hidden = ehEstudante; navegacaoProfessora.style.display = ehEstudante ? "none" : "flex"; }
    if (caixaPontosTopo) { caixaPontosTopo.style.display = ehEstudante ? "flex" : "none"; }
    if (ehEstudante) {
      if (avatarBarraTopo) avatarBarraTopo.src = "assets/avatar-bruno.png";
      if (nomeBarraTopo) nomeBarraTopo.textContent = "Bruno Delorence";
      if (cargoBarraTopo) { cargoBarraTopo.textContent = setorAutenticado === "responsaveis" ? "Acesso Responsável • Bruno Delorence (3°E)" : "Estudante • 1º Lugar (3°E)"; }
      mostrarTela("estudante-inicio");
    } else {
      if (avatarBarraTopo) avatarBarraTopo.src = "assets/avatar-tatiane.png";
      if (nomeBarraTopo) nomeBarraTopo.textContent = "Profª. Tatiane Soma";
      if (cargoBarraTopo) cargoBarraTopo.textContent = "Docente • Matemática e Algoritmos";
      mostrarTela("professora-inicio");
    }
  };
  const entrarPainel = (modo) => {
    if (sobreposicaoTelaCheiaLogin) { sobreposicaoTelaCheiaLogin.hidden = true; sobreposicaoTelaCheiaLogin.style.display = "none"; }
    if (aplicacaoPrincipalComputador) { aplicacaoPrincipalComputador.hidden = false; aplicacaoPrincipalComputador.style.display = "grid"; }
    definirModoPerfil(modo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const voltarTelaLogin = () => {
    setorAutenticado = null;
    if (aplicacaoPrincipalComputador) { aplicacaoPrincipalComputador.hidden = true; aplicacaoPrincipalComputador.style.display = "none"; }
    if (sobreposicaoTelaCheiaLogin) { sobreposicaoTelaCheiaLogin.hidden = false; sobreposicaoTelaCheiaLogin.style.display = "flex"; }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const etapaCatalogoMaterias = document.getElementById("etapaCatalogoMaterias");
  const etapaTrilhaMateria = document.getElementById("etapaTrilhaMateria");
  const etapaNiveisModulo = document.getElementById("etapaNiveisModulo");
  const etapaDesafioNivel = document.getElementById("etapaDesafioNivel");
  const definirEtapaAtividade = (etapa) => {
    const mapaEtapas = { catalogo: etapaCatalogoMaterias, trilha: etapaTrilhaMateria, niveis: etapaNiveisModulo, desafio: etapaDesafioNivel, };
    Object.entries(mapaEtapas).forEach(([chave, elemento]) => { if (!elemento) return; const estaVisivel = chave === etapa; elemento.hidden = !estaVisivel; elemento.style.display = estaVisivel ? (chave === "catalogo" ? "flex" : "block") : "none"; });
  };
  const mostrarCatalogoMaterias = () => definirEtapaAtividade("catalogo");
  document.querySelectorAll("[data-tela]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const telaAlvo = botao.getAttribute("data-tela");
      mostrarTela(telaAlvo);
      if (telaAlvo === "estudante-atividades") { mostrarCatalogoMaterias(); }
    });
  });
  document.querySelectorAll("[data-ir-tela]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const telaAlvo = botao.getAttribute("data-ir-tela");
      if (!telaAlvo) return;
      if (telaAlvo.startsWith("professora-") && setorAutenticado !== "instituicao") { return; }
      if (telaAlvo.startsWith("estudante-") && setorAutenticado === "instituicao") { return; }
      mostrarTela(telaAlvo);
      if (telaAlvo === "estudante-atividades") { mostrarCatalogoMaterias(); }
    });
  });
  document.getElementById("botaoAbrirBoasVindas")?.addEventListener("click", voltarTelaLogin);
  document.getElementById("botaoSairBarraLateral")?.addEventListener("click", voltarTelaLogin);
  document.getElementById("botaoSairPerfil")?.addEventListener("click", voltarTelaLogin);
  let perfilEscolhido = "estudante";
  const seloPerfilSelecionado = document.getElementById("seloPerfilSelecionado");
  const usuarioLogin = document.getElementById("usuarioLogin");
  const nomeUsuarioCadastro = document.getElementById("nomeUsuarioCadastro");
  const emailCadastro = document.getElementById("emailCadastro");
  const mensagemRetornoLogin = document.getElementById("mensagemRetornoLogin");
  const mensagemRetornoCadastro = document.getElementById("mensagemRetornoCadastro");
  const limparMensagensAutenticacao = () => { if (mensagemRetornoLogin) mensagemRetornoLogin.textContent = ""; if (mensagemRetornoCadastro) mensagemRetornoCadastro.textContent = ""; };
  const predefinicoesPerfil = {
    responsaveis: { rotulo: "RESPONSÁVEIS", usuario: "responsavel.bruno@gmail.com", nomeUsuario: "responsavel.bruno", modo: "estudante", }, estudante: { rotulo: "ESTUDANTE", usuario: "brunodelorence@gmail.com", nomeUsuario: "brunodelorence", modo: "estudante", }, instituicao: { rotulo: "INSTITUIÇÃO / PROFESSOR", usuario: "tatianesoma@gmail.com", nomeUsuario: "Tatiane Soma", modo: "professora", }, };
  document.querySelectorAll("[data-selecionar-perfil]").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.querySelectorAll("[data-selecionar-perfil]").forEach((item) => item.classList.remove("ativo"));
      botao.classList.add("ativo");
      perfilEscolhido = botao.getAttribute("data-selecionar-perfil") || "estudante";
      const predefinicao = predefinicoesPerfil[perfilEscolhido] || predefinicoesPerfil.estudante;
      limparMensagensAutenticacao();
      if (seloPerfilSelecionado) {
        seloPerfilSelecionado.innerHTML = `Perfil: <strong>${predefinicao.rotulo}</strong>`;
      }
      if (usuarioLogin) usuarioLogin.value = predefinicao.usuario;
      if (nomeUsuarioCadastro) nomeUsuarioCadastro.value = predefinicao.nomeUsuario;
      if (emailCadastro) emailCadastro.value = predefinicao.usuario;
    });
  });
  const alternarAbaAutenticacao = (nomeAba) => {
    limparMensagensAutenticacao();
    document.querySelectorAll("[data-aba-autenticacao]").forEach((aba) => { aba.classList.toggle("ativo", aba.getAttribute("data-aba-autenticacao") === nomeAba); });
    const formularioLogin = document.getElementById("formularioLogin");
    const formularioCadastro = document.getElementById("formularioCadastro");
    const formularioRecuperacao = document.getElementById("formularioRecuperacao");
    if (formularioLogin) { formularioLogin.hidden = nomeAba !== "login"; formularioLogin.style.display = nomeAba === "login" ? "block" : "none"; }
    if (formularioCadastro) { formularioCadastro.hidden = nomeAba !== "signup"; formularioCadastro.style.display = nomeAba === "signup" ? "block" : "none"; }
    if (formularioRecuperacao) { formularioRecuperacao.hidden = nomeAba !== "recover"; formularioRecuperacao.style.display = nomeAba === "recover" ? "block" : "none"; }
  };
  document.querySelectorAll("[data-aba-autenticacao]").forEach((botao) => { botao.addEventListener("click", () => alternarAbaAutenticacao(botao.getAttribute("data-aba-autenticacao")) ); });
  document.querySelectorAll("[data-trocar-autenticacao]").forEach((botao) => { botao.addEventListener("click", () => alternarAbaAutenticacao(botao.getAttribute("data-trocar-autenticacao")) ); });
  document.getElementById("botaoSetaVoltarAutenticacao")?.addEventListener("click", () => { alternarAbaAutenticacao("login"); });
  document.querySelectorAll("[data-alternar-senha]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const idCampoAlvo = botao.getAttribute("data-alternar-senha");
      const campoInput = document.getElementById(idCampoAlvo);
      if (!campoInput) return;
      campoInput.type = campoInput.type === "password" ? "text" : "password";
    });
  });
  const processarAcessoAutenticacao = (evento) => {
    if (evento) evento.preventDefault();
    limparMensagensAutenticacao();
    const valorUsuario = (document.getElementById("usuarioLogin")?.value || "").toLowerCase();
    const valorEmailCadastro = (document.getElementById("emailCadastro")?.value || "").toLowerCase();
    const tentandoContaProfessora = valorUsuario.includes("tatiane") || valorUsuario.includes("prof") || valorEmailCadastro.includes("tatiane") || valorEmailCadastro.includes("prof");
    if (perfilEscolhido === "instituicao") { setorAutenticado = "instituicao"; entrarPainel("professora"); return; }
    if (tentandoContaProfessora && perfilEscolhido !== "instituicao") {
      const aviso = "⚠️ Acesso negado: O perfil de Professora só pode ser acessado selecionando o setor INSTITUIÇÃO ao lado.";
      if (mensagemRetornoLogin) { mensagemRetornoLogin.style.color = "#ef4444"; mensagemRetornoLogin.textContent = aviso; }
      if (mensagemRetornoCadastro) { mensagemRetornoCadastro.style.color = "#ef4444"; mensagemRetornoCadastro.textContent = aviso; }
      return;
    }
    setorAutenticado = perfilEscolhido;
    entrarPainel("estudante");
  };
  document.getElementById("formularioLogin")?.addEventListener("submit", processarAcessoAutenticacao);
  document.querySelector("#formularioLogin .botao-enviar-figma")
    ?.addEventListener("click", processarAcessoAutenticacao);
  document
    .getElementById("formularioCadastro")
    ?.addEventListener("submit", processarAcessoAutenticacao);
  document.querySelector("#formularioCadastro .botao-enviar-figma")
    ?.addEventListener("click", processarAcessoAutenticacao);
  document.getElementById("formularioRecuperacao")?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const mensagemRetornoRecuperacao = document.getElementById("mensagemRetornoRecuperacao");
    const valorEmail = document.getElementById("campoEmailRecuperacao")?.value || "";
    if (mensagemRetornoRecuperacao) {
      mensagemRetornoRecuperacao.textContent = `✅ Link de redefinição enviado para ${valorEmail}!`;
    }
    setTimeout(() => { if (mensagemRetornoRecuperacao) mensagemRetornoRecuperacao.textContent = ""; alternarAbaAutenticacao("login"); }, 2500);
  });
  let pontosEstudante = 2564;
  let progressoEstudos = 20;
  const pontosGlobaisEstudante = document.getElementById("pontosGlobaisEstudante");
  const rotuloProgressoEstudos = document.getElementById("rotuloProgressoEstudos");
  const barraProgressoEstudos = document.getElementById("barraProgressoEstudos");
  const atualizarExibicaoPontos = () => {
    if (pontosGlobaisEstudante) { pontosGlobaisEstudante.textContent = String(pontosEstudante); }
  };
  const campoBuscaAtividade = document.getElementById("campoBuscaAtividade");
  campoBuscaAtividade?.addEventListener("input", () => {
    const termoBusca = campoBuscaAtividade.value.toLowerCase().trim();
    document.querySelectorAll("#gradeMaterias .cartao-materia").forEach((cartao) => { const nomeMateria = (cartao.getAttribute("data-materia") || "").toLowerCase(); cartao.style.display = nomeMateria.includes(termoBusca) ? "" : "none"; });
  });
  const tituloMateriaSelecionada = document.getElementById("tituloMateriaSelecionada");
  const pilulaProgressoMateriaAtiva = document.getElementById("pilulaProgressoMateriaAtiva");
  const cartaoBannerMateriaAtiva = document.getElementById("cartaoBannerMateriaAtiva");
  const blocosIconesMateriaAtiva = document.getElementById("blocosIconesMateriaAtiva");
  const seloContadorDetalheMateria = document.getElementById("seloContadorDetalheMateria");
  const listaTrilhaAprendizagem = document.getElementById("listaTrilhaAprendizagem");
  const gradeNiveisMateria = document.getElementById("gradeNiveisMateria");
  const seloModuloAtivo = document.getElementById("seloModuloAtivo");
  const seloProgressoDesafioAtivo = document.getElementById("seloProgressoDesafioAtivo");
  const tituloBannerDesafio = document.getElementById("tituloBannerDesafio");
  const caixaDiagramaAngulo = document.getElementById("caixaDiagramaAngulo");
  const textoPerguntaDesafio = document.getElementById("textoPerguntaDesafio");
  const gradeOpcoesDesafio = document.getElementById("gradeOpcoesDesafio");
  const mensagemRetornoDesafio = document.getElementById("mensagemRetornoDesafio");
  const cartaoDesafioAtivo = document.getElementById("cartaoDesafioAtivo");
  const cartaoDesafioConcluido = document.getElementById("cartaoDesafioConcluido");
  const curriculoMaterias = {
    Matemática: {
      contador: "03/30", classeFundo: "fundo-matematica", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-math-plus.svg" alt="" /></div> <div class="bloco bloco--fundo"><img src="assets/icon-math-percent.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Operações", descricao: "Aprenda as operações básicas", concluido: true, bloqueado: false },
        { titulo: "Equações de 1º grau", descricao: "Aprenda a resolver equações", concluido: false, bloqueado: false },
        { titulo: "Equações de 2º grau", descricao: "Aprenda equações complexas", concluido: false, bloqueado: false },
        { titulo: "Grupos numéricos", descricao: "Aprenda conjuntos (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Soma", "Nível 2: Subtração", "Nível 3: Divisão", "Nível 4: Multiplicação", "Nível 5: Radiciação", "Nível 6: Potenciação", "Nível 7: Fração", "Nível 8: Logaritmação", "Nível 9: Soma de raiz", "Nível 10: Divisão de raiz", "Nível 11: Raiz cúbica", "Nível 12: Raiz quarta" ],
      questoes: [
        { tituloBanner: "Soma", possuiAngulo36: true, enunciado: "Some o ângulo por eles mesmo:", alternativas: ["45º", "55º", "71º", "72º"], indiceCorreto: 3 },
        { tituloBanner: "Soma — Questão 2", possuiAngulo9042: true, enunciado: "1- Dados os ângulos abaixo, 90º e 42º, some-os como apresentado em sala:", alternativas: ["132º", "133º", "134º", "135º"], indiceCorreto: 0 },
      ],
    },
    Português: {
      contador: "0/30", classeFundo: "fundo-portugues", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-port-a.svg" alt="" /></div> <div class="bloco bloco--fundo"><img src="assets/icon-port-j.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Interpretação Textual", descricao: "Compreensão de textos e artigos", concluido: true, bloqueado: false },
        { titulo: "Classes Gramaticais", descricao: "Substantivos, verbos e adjetivos", concluido: false, bloqueado: false },
        { titulo: "Sintaxe e Período", descricao: "Análise sintática e orações", concluido: false, bloqueado: false },
        { titulo: "Redação Dissertativa", descricao: "Estrutura e argumentação (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Ortografia", "Nível 2: Acentuação", "Nível 3: Pontuação", "Nível 4: Substantivos", "Nível 5: Verbos", "Nível 6: Adjetivos", "Nível 7: Pronomes", "Nível 8: Concordância", "Nível 9: Regência", "Nível 10: Crase", "Nível 11: Figuras de Linguagem", "Nível 12: Coesão Textual" ],
      questoes: [
        { tituloBanner: "Português — Questão 1", possuiAngulo36: false, enunciado: "Qual das palavras abaixo está grafada corretamente segundo a norma-padrão?", alternativas: ["Exceção", "Excessão", "Eceção", "Exceon"], indiceCorreto: 0 },
        { tituloBanner: "Português — Questão 2", possuiAngulo36: false, enunciado: "Assinale a alternativa em que o uso da crase está correto:", alternativas: ["Fui à escola cedo.", "Comprei à vista o livro.", "Ambas estão corretas.", "Nenhuma está correta."], indiceCorreto: 2 },
      ],
    },
    Biologia: {
      contador: "07/30", classeFundo: "fundo-biologia", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-bio-lungs.svg" alt="" /></div> <div class="bloco bloco--fundo"><img src="assets/icon-bio-heart.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Fisiologia Humana", descricao: "Sistemas respiratório e circulatório", concluido: true, bloqueado: false },
        { titulo: "Citologia", descricao: "Estrutura das células e organelas", concluido: false, bloqueado: false },
        { titulo: "Ecologia e Biomas", descricao: "Cadeias alimentares e ecossistemas", concluido: false, bloqueado: false },
        { titulo: "Genética Básica", descricao: "Leis de Mendel e DNA (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Sistema Respiratório", "Nível 2: Sistema Cardíaco", "Nível 3: Células", "Nível 4: Mitocôndria e ATP", "Nível 5: Fotossíntese", "Nível 6: Divisão Celular", "Nível 7: DNA e RNA", "Nível 8: Sistema Nervoso", "Nível 9: Sistema Digestório", "Nível 10: Ecologia", "Nível 11: Evolução", "Nível 12: Imunologia" ],
      questoes: [
        { tituloBanner: "Biologia — Questão 1", possuiAngulo36: false, enunciado: "Qual organela celular é responsável pela respiração celular e produção de ATP?", alternativas: ["Complexo de Golgi", "Mitocôndria", "Lisossomo", "Ribossomo"], indiceCorreto: 1 },
        { tituloBanner: "Biologia — Questão 2", possuiAngulo36: false, enunciado: "Em qual estrutura dos pulmões ocorre a troca gasosa (hematose)?", alternativas: ["Brônquios", "Traqueia", "Alvéolos pulmonares", "Laringe"], indiceCorreto: 2 },
      ],
    },
    Química: {
      contador: "16/30", classeFundo: "fundo-quimica", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-chem-drop.svg" alt="" /></div> <div class="bloco bloco--fundo"><img src="assets/icon-chem-hazard.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Tabela Periódica", descricao: "Elementos, famílias e períodos", concluido: true, bloqueado: false },
        { titulo: "Ligações Químicas", descricao: "Iônica, covalente e metálica", concluido: false, bloqueado: false },
        { titulo: "Funções Inorgânicas", descricao: "Ácidos, bases, sais e óxidos", concluido: false, bloqueado: false },
        { titulo: "Estequiometria", descricao: "Cálculos químicos e mol (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Átomos", "Nível 2: Tabela Periódica", "Nível 3: Reações", "Nível 4: Ligação Iônica", "Nível 5: Ligação Covalente", "Nível 6: Ácidos e Bases", "Nível 7: Sais e Óxidos", "Nível 8: Balanceamento", "Nível 9: Massa Molar", "Nível 10: Soluções", "Nível 11: Termoquímica", "Nível 12: Eletroquímica" ],
      questoes: [
        { tituloBanner: "Química — Questão 1", possuiAngulo36: false, enunciado: "Qual é o símbolo químico do elemento Oxigênio e seu número atômico?", alternativas: ["O (Z = 8)", "Ox (Z = 6)", "Og (Z = 16)", "O (Z = 12)"], indiceCorreto: 0 },
        { tituloBanner: "Química — Questão 2", possuiAngulo36: false, enunciado: "Qual é o valor de pH característico de uma solução ácida a 25 °C?", alternativas: ["pH = 7", "pH < 7", "pH > 7", "pH = 14"], indiceCorreto: 1 },
      ],
    },
    Física: {
      contador: "18/30", classeFundo: "fundo-fisica", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-phys-atom.svg" alt="" /></div> <div class="bloco bloco--fundo"><img src="assets/icon-phys-energy.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Cinemática", descricao: "Velocidade média, MRU e MRUV", concluido: true, bloqueado: false },
        { titulo: "Leis de Newton", descricao: "Dinâmica, inércia e forças", concluido: false, bloqueado: false },
        { titulo: "Trabalho e Energia", descricao: "Energia cinética e potencial", concluido: false, bloqueado: false },
        { titulo: "Eletrodinâmica", descricao: "Corrente, tensão e resistores (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Velocidade Média", "Nível 2: Aceleração", "Nível 3: Força Resultante", "Nível 4: 1ª Lei de Newton", "Nível 5: 2ª Lei de Newton", "Nível 6: 3ª Lei de Newton", "Nível 7: Energia Cinética", "Nível 8: Energia Potencial", "Nível 9: Calorimetria", "Nível 10: Óptica", "Nível 11: Ondulatória", "Nível 12: Lei de Ohm" ],
      questoes: [
        { tituloBanner: "Física — Questão 1", possuiAngulo36: false, enunciado: "Um móvel percorre 100 metros em 10 segundos. Qual é a sua velocidade média?", alternativas: ["5 m/s", "10 m/s", "20 m/s", "100 m/s"], indiceCorreto: 1 },
        { tituloBanner: "Física — Questão 2", possuiAngulo36: false, enunciado: "Segundo a 2ª Lei de Newton (F = m · a), qual a força resultante em um corpo de 4 kg com aceleração de 3 m/s²?", alternativas: ["7 N", "12 N", "1,3 N", "24 N"], indiceCorreto: 1 },
      ],
    },
    Inglês: {
      contador: "22/30", classeFundo: "fundo-matematica", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">EN</span></div> <div class="bloco bloco--fundo"><img src="assets/icon-eng-lang.svg" alt="" /></div>`,
      modulos: [
        { titulo: "Gramática Básica", descricao: "Verbo To Be e Presente Simples", concluido: true, bloqueado: false },
        { titulo: "Compreensão de Leitura", descricao: "Leitura e interpretação em inglês", concluido: false, bloqueado: false },
        { titulo: "Tempos Verbais", descricao: "Passado Simples e Futuro", concluido: false, bloqueado: false },
        { titulo: "Conversação Avançada", descricao: "Expressões idiomáticas (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Verbo To Be", "Nível 2: Presente Simples", "Nível 3: Vocabulário", "Nível 4: Pronomes", "Nível 5: Presente Contínuo", "Nível 6: Passado Simples", "Nível 7: Verbos Irregulares", "Nível 8: Futuro com Will", "Nível 9: Verbos Modais", "Nível 10: Preposições", "Nível 11: Comparativos", "Nível 12: Interpretação" ],
      questoes: [
        { tituloBanner: "Inglês — Questão 1", possuiAngulo36: false, enunciado: "Complete a frase corretamente: 'She ___ a dedicated student at In Aula.'", alternativas: ["am", "are", "is", "be"], indiceCorreto: 2 },
        { tituloBanner: "Inglês — Questão 2", possuiAngulo36: false, enunciado: "Qual é o passado simples do verbo irregular 'go' (ir)?", alternativas: ["goed", "went", "gone", "going"], indiceCorreto: 1 },
      ],
    },
    História: {
      contador: "09/30", classeFundo: "fundo-portugues", htmlBlocos: `<div class="bloco bloco--frente"><img src="assets/icon-hist-temple.svg" alt="" /></div> <div class="bloco bloco--fundo"><span class="letra-bloco">🏛️</span></div>`,
      modulos: [
        { titulo: "Idade Antiga", descricao: "Grécia, Roma e Império Bizantino", concluido: true, bloqueado: false },
        { titulo: "Idade Média e Moderna", descricao: "Feudalismo, Renascimento e Grandes Navegações", concluido: false, bloqueado: false },
        { titulo: "História do Brasil", descricao: "Período Colonial, Império e República", concluido: false, bloqueado: false },
        { titulo: "Século XX e Contemporânea", descricao: "Conflitos mundiais e globalização (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Antiguidade", "Nível 2: Grécia Antiga", "Nível 3: Império Romano", "Nível 4: Idade Média", "Nível 5: Renascimento", "Nível 6: Grandes Navegações", "Nível 7: Brasil Colônia", "Nível 8: Independência", "Nível 9: Brasil Império", "Nível 10: Brasil República", "Nível 11: Era Vargas", "Nível 12: Redemocratização" ],
      questoes: [
        { tituloBanner: "História — Questão 1", possuiAngulo36: false, enunciado: "Em que ano ocorreu a Proclamação da República no Brasil?", alternativas: ["1822", "1888", "1889", "1930"], indiceCorreto: 2 },
        { tituloBanner: "História — Questão 2", possuiAngulo36: false, enunciado: "Qual civilização antiga ficou conhecida pelo desenvolvimento da democracia em Atenas?", alternativas: ["Egípcia", "Grega", "Fenícia", "Persa"], indiceCorreto: 1 },
      ],
    },
    Geografia: {
      contador: "14/30", classeFundo: "fundo-biologia", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">🌍</span></div> <div class="bloco bloco--fundo"><span class="letra-bloco">🧭</span></div>`,
      modulos: [
        { titulo: "Cartografia e Clima", descricao: "Coordenadas, fusos horários e climas", concluido: true, bloqueado: false },
        { titulo: "Geografia do Brasil", descricao: "Regiões, relevo, hidrografia e biomas", concluido: false, bloqueado: false },
        { titulo: "Geopolítica e Urbanização", descricao: "Globalização, demografia e blocos econômicos", concluido: false, bloqueado: false },
        { titulo: "Meio Ambiente e Energia", descricao: "Fontes renováveis e sustentabilidade (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Cartografia", "Nível 2: Fusos Horários", "Nível 3: Relevo Brasileiro", "Nível 4: Clima e Vegetação", "Nível 5: Hidrografia", "Nível 6: Biomas do Brasil", "Nível 7: Urbanização", "Nível 8: Demografia", "Nível 9: Industrialização", "Nível 10: Agropecuária", "Nível 11: Fontes de Energia", "Nível 12: Geopolítica Mundial" ],
      questoes: [
        { tituloBanner: "Geografia — Questão 1", possuiAngulo36: false, enunciado: "Qual é o maior bioma brasileiro em extensão territorial?", alternativas: ["Cerrado", "Mata Atlântica", "Amazônia", "Caatinga"], indiceCorreto: 2 },
        { tituloBanner: "Geografia — Questão 2", possuiAngulo36: false, enunciado: "Como se chama a linha imaginária que divide a Terra nos hemisférios Norte e Sul?", alternativas: ["Meridiano de Greenwich", "Linha do Equador", "Trópico de Capricórnio", "Trópico de Câncer"], indiceCorreto: 1 },
      ],
    },
    Artes: {
      contador: "11/30", classeFundo: "fundo-quimica", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">🎨</span></div> <div class="bloco bloco--fundo"><span class="letra-bloco">🎭</span></div>`,
      modulos: [
        { titulo: "História da Arte", descricao: "Da arte rupestre ao Renascimento", concluido: true, bloqueado: false },
        { titulo: "Arte Moderna no Brasil", descricao: "Semana de Arte Moderna de 1922 e vanguardas", concluido: false, bloqueado: false },
        { titulo: "Cores, Formas e Música", descricao: "Teoria das cores, expressão visual e ritmos", concluido: false, bloqueado: false },
        { titulo: "Arte Contemporânea", descricao: "Instalações, fotografia e cinema (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Arte Rupestre", "Nível 2: Arte Clássica", "Nível 3: Renascimento", "Nível 4: Barroco no Brasil", "Nível 5: Impressionismo", "Nível 6: Expressionismo", "Nível 7: Cubismo", "Nível 8: Semana de 1922", "Nível 9: Teoria das Cores", "Nível 10: Teatro e Dança", "Nível 11: Música Brasileira", "Nível 12: Fotografia e Cinema" ],
      questoes: [
        { tituloBanner: "Artes — Questão 1", possuiAngulo36: false, enunciado: "Quais são as três cores primárias no sistema pigmento tradicional?", alternativas: ["Verde, Roxo e Laranja", "Vermelho, Amarelo e Azul", "Branco, Preto e Cinza", "Azul, Verde e Amarelo"], indiceCorreto: 1 },
        { tituloBanner: "Artes — Questão 2", possuiAngulo36: false, enunciado: "Em que cidade brasileira ocorreu a histórica Semana de Arte Moderna de 1922?", alternativas: ["Rio de Janeiro", "Salvador", "São Paulo", "Belo Horizonte"], indiceCorreto: 2 },
      ],
    },
    Filosofia: {
      contador: "15/30", classeFundo: "fundo-fisica", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">🦉</span></div> <div class="bloco bloco--fundo"><span class="letra-bloco">💡</span></div>`,
      modulos: [
        { titulo: "Filosofia Antiga", descricao: "Pré-socráticos, Sócrates, Platão e Aristóteles", concluido: true, bloqueado: false },
        { titulo: "Ética e Moral", descricao: "Virtude, liberdade e responsabilidade", concluido: false, bloqueado: false },
        { titulo: "Teoria do Conhecimento", descricao: "Racionalismo, empirismo e ciência", concluido: false, bloqueado: false },
        { titulo: "Filosofia Contemporânea", descricao: "Existencialismo e Escola de Frankfurt (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Mito e Razão", "Nível 2: Pré-Socráticos", "Nível 3: Sócrates", "Nível 4: Platão", "Nível 5: Aristóteles", "Nível 6: Filosofia Medieval", "Nível 7: Racionalismo", "Nível 8: Empirismo", "Nível 9: Iluminismo", "Nível 10: Ética de Kant", "Nível 11: Existencialismo", "Nível 12: Lógica e Ciência" ],
      questoes: [
        { tituloBanner: "Filosofia — Questão 1", possuiAngulo36: false, enunciado: "Qual filósofo grego é autor da célebre frase 'Só sei que nada sei'?", alternativas: ["Aristóteles", "Sócrates", "Tales de Mileto", "Epicuro"], indiceCorreto: 1 },
        { tituloBanner: "Filosofia — Questão 2", possuiAngulo36: false, enunciado: "Quem formulou a famosa Alegoria da Caverna na obra 'A República'?", alternativas: ["Platão", "Descartes", "Kant", "Nietzsche"], indiceCorreto: 0 },
      ],
    },
    Sociologia: {
      contador: "12/30", classeFundo: "fundo-matematica", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">👥</span></div> <div class="bloco bloco--fundo"><span class="letra-bloco">🌐</span></div>`,
      modulos: [
        { titulo: "Clássicos da Sociologia", descricao: "Durkheim, Weber e Karl Marx", concluido: true, bloqueado: false },
        { titulo: "Cultura e Sociedade", descricao: "Identidade, diversidade e socialização", concluido: false, bloqueado: false },
        { titulo: "Cidadania e Direitos", descricao: "Estado, democracia e movimentos sociais", concluido: false, bloqueado: false },
        { titulo: "Trabalho no Mundo Atual", descricao: "Tecnologia e relações de trabalho (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Surgimento da Sociologia", "Nível 2: Émile Durkheim", "Nível 3: Fato Social", "Nível 4: Max Weber", "Nível 5: Ação Social", "Nível 6: Karl Marx", "Nível 7: Cultura e Ideologia", "Nível 8: Estratificação Social", "Nível 9: Cidadania", "Nível 10: Movimentos Sociais", "Nível 11: Sociologia no Brasil", "Nível 12: Globalização" ],
      questoes: [
        { tituloBanner: "Sociologia — Questão 1", possuiAngulo36: false, enunciado: "Qual sociólogo francês definiu o conceito de 'Fato Social' como objeto da Sociologia?", alternativas: ["Max Weber", "Émile Durkheim", "Auguste Comte", "Zygmunt Bauman"], indiceCorreto: 1 },
        { tituloBanner: "Sociologia — Questão 2", possuiAngulo36: false, enunciado: "Para Max Weber, o objeto central de estudo da Sociologia compreensiva é:", alternativas: ["A Ação Social", "O Estado Absoluto", "A Biologia Humana", "O Clima"], indiceCorreto: 0 },
      ],
    },
    "Educação Física": {
      contador: "20/30", classeFundo: "fundo-portugues", htmlBlocos: `<div class="bloco bloco--frente"><span class="letra-bloco">⚽</span></div> <div class="bloco bloco--fundo"><span class="letra-bloco">🏅</span></div>`,
      modulos: [
        { titulo: "Esportes Coletivos", descricao: "Futsal, voleibol, basquete e handebol", concluido: true, bloqueado: false },
        { titulo: "Saúde e Qualidade de Vida", descricao: "Capacidades físicas, nutrição e bem-estar", concluido: false, bloqueado: false },
        { titulo: "Jogos, Lutas e Ginástica", descricao: "Atletismo, artes marciais e movimento", concluido: false, bloqueado: false },
        { titulo: "Fisiologia do Exercício", descricao: "Treinamento e prevenção de lesões (Atividade Bloqueada)", concluido: false, bloqueado: true },
      ],
      niveis: [ "Nível 1: Aquecimento e Alongamento", "Nível 2: Futsal", "Nível 3: Voleibol", "Nível 4: Basquetebol", "Nível 5: Handebol", "Nível 6: Atletismo", "Nível 7: Ginástica", "Nível 8: Resistência Aeróbica", "Nível 9: Força e Flexibilidade", "Nível 10: Esportes Olímpicos", "Nível 11: Dança e Ritmo", "Nível 12: Saúde e Nutrição" ],
      questoes: [
        { tituloBanner: "Educação Física — Questão 1", possuiAngulo36: false, enunciado: "Quantos jogadores titulares compõem uma equipe de Voleibol em quadra?", alternativas: ["5 jogadores", "6 jogadores", "7 jogadores", "11 jogadores"], indiceCorreto: 1 },
        { tituloBanner: "Educação Física — Questão 2", possuiAngulo36: false, enunciado: "Qual capacidade física está diretamente relacionada à amplitude de movimento das articulações?", alternativas: ["Velocidade", "Flexibilidade", "Equilíbrio", "Agilidade"], indiceCorreto: 1 },
      ],
    },
  };
  let chaveMateriaAtual = "Matemática";
  let tituloModuloAtual = "Operações";
  let rotuloNivelAtual = "Nível 1: Soma";
  let indiceQuestaoAtual = 0;
  const abrirTrilhaMateria = (nomeMateria) => {
    chaveMateriaAtual = curriculoMaterias[nomeMateria] ? nomeMateria : "Matemática";
    const dadosMateria = curriculoMaterias[chaveMateriaAtual];
    mostrarTela("estudante-atividades");
    definirEtapaAtividade("trilha");
    if (seloContadorDetalheMateria) {
      seloContadorDetalheMateria.textContent = `Matéria: ${chaveMateriaAtual} • ${dadosMateria.contador}`;
    }
    if (pilulaProgressoMateriaAtiva) { pilulaProgressoMateriaAtiva.textContent = dadosMateria.contador; }
    if (tituloMateriaSelecionada) { tituloMateriaSelecionada.textContent = chaveMateriaAtual; }
    if (cartaoBannerMateriaAtiva) {
      cartaoBannerMateriaAtiva.className = `cabecalho-banner-materia ${dadosMateria.classeFundo}`;
    }
    if (blocosIconesMateriaAtiva) { blocosIconesMateriaAtiva.innerHTML = dadosMateria.htmlBlocos; }
    if (listaTrilhaAprendizagem) {
      listaTrilhaAprendizagem.innerHTML = dadosMateria.modulos.map(
          (modulo) => `<div class="no-trilha ${modulo.concluido ? "concluido" : ""} ${modulo.bloqueado ? "bloqueado" : ""}" data-modulo="${modulo.titulo}" data-bloqueado="${modulo.bloqueado}"> <div class="no-trilha__circulo">${modulo.concluido ? "✓" : modulo.bloqueado ? "🔒" : "🏆"}</div> <div class="no-trilha__texto"> <strong>${modulo.titulo}</strong> <span>${modulo.descricao}</span> </div> <span class="no-trilha__seta">${modulo.bloqueado ? "Bloqueada" : "❯"}</span> </div>`
        ).join("");
      listaTrilhaAprendizagem.querySelectorAll(".no-trilha").forEach((noModulo) => {
        noModulo.addEventListener("click", () => {
          if (noModulo.getAttribute("data-bloqueado") === "true") return;
          const nomeModulo = noModulo.getAttribute("data-modulo") || dadosMateria.modulos[0].titulo;
          abrirNiveisModulo(nomeModulo);
        });
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const abrirNiveisModulo = (nomeModulo) => {
    tituloModuloAtual = nomeModulo;
    const dadosMateria = curriculoMaterias[chaveMateriaAtual];
    definirEtapaAtividade("niveis");
    if (seloModuloAtivo) {
      seloModuloAtivo.textContent = `${chaveMateriaAtual} • Módulo: ${tituloModuloAtual}`;
    }
    if (gradeNiveisMateria) {
      gradeNiveisMateria.innerHTML = dadosMateria.niveis.map(
          (rotuloNivel) => `<button type="button" class="botao-bloco-nivel" data-nivel="${rotuloNivel}"> ${rotuloNivel} </button>`
        ).join("");
      gradeNiveisMateria.querySelectorAll(".botao-bloco-nivel").forEach((botao) => {
        botao.addEventListener("click", () => { const rotuloNivel = botao.getAttribute("data-nivel") || dadosMateria.niveis[0]; abrirDesafioNivel(rotuloNivel, 0); });
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const abrirDesafioNivel = (rotuloNivel, indiceQuestao = 0) => {
    const dadosMateria = curriculoMaterias[chaveMateriaAtual];
    rotuloNivelAtual = rotuloNivel;
    indiceQuestaoAtual = indiceQuestao;
    const listaQuestoes = dadosMateria.questoes;
    const questaoAtual = listaQuestoes[indiceQuestaoAtual] || listaQuestoes[0];
    definirEtapaAtividade("desafio");
    if (cartaoDesafioAtivo) { cartaoDesafioAtivo.hidden = false; cartaoDesafioAtivo.style.display = "block"; }
    if (cartaoDesafioConcluido) { cartaoDesafioConcluido.hidden = true; cartaoDesafioConcluido.style.display = "none"; }
    if (seloProgressoDesafioAtivo) {
      seloProgressoDesafioAtivo.textContent = `${chaveMateriaAtual} • ${rotuloNivel} (${indiceQuestaoAtual + 1}/${listaQuestoes.length})`;
    }
    const tituloCurto = rotuloNivel.includes(":")
      ? rotuloNivel.split(":")[1].trim()
      : questaoAtual.tituloBanner;
    if (tituloBannerDesafio) { tituloBannerDesafio.textContent = indiceQuestaoAtual === 0 ? tituloCurto : questaoAtual.tituloBanner; }
    if (caixaDiagramaAngulo) {
      if (questaoAtual.possuiAngulo36) {
        caixaDiagramaAngulo.style.display = "flex";
        caixaDiagramaAngulo.innerHTML = `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M35 100 L145 20 M145 20 L125 20 M145 20 L145 38" stroke="#164A68" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M35 100 L185 100 M185 100 L172 88 M185 100 L172 112" stroke="#164A68" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M88 100 A52 52 0 0 0 76 68" stroke="#164A68" stroke-width="4" fill="none"/> <text x="102" y="82" fill="#164A68" font-family="Nunito, sans-serif" font-weight="800" font-size="22">36°</text> </svg>`;
      } else if (questaoAtual.possuiAngulo9042) {
        caixaDiagramaAngulo.style.display = "flex";
        caixaDiagramaAngulo.innerHTML = `<svg width="280" height="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25 25 L25 100 L110 100" stroke="#164A68" stroke-width="4" stroke-linecap="round"/> <rect x="25" y="82" width="18" height="18" stroke="#164A68" stroke-width="3" fill="none"/> <text x="52" y="75" fill="#164A68" font-family="Nunito, sans-serif" font-weight="800" font-size="20">90°</text> <path d="M155 100 L235 40 M155 100 L255 100" stroke="#164A68" stroke-width="4" stroke-linecap="round"/> <text x="200" y="86" fill="#164A68" font-family="Nunito, sans-serif" font-weight="800" font-size="20">42°</text> </svg>`;
      } else { caixaDiagramaAngulo.style.display = "none"; caixaDiagramaAngulo.innerHTML = ""; }
    }
    if (textoPerguntaDesafio) { textoPerguntaDesafio.textContent = questaoAtual.enunciado; }
    if (mensagemRetornoDesafio) { mensagemRetornoDesafio.textContent = ""; }
    if (gradeOpcoesDesafio) {
      gradeOpcoesDesafio.innerHTML = questaoAtual.alternativas.map(
          (alternativa, indice) =>
            `<button type="button" class="botao-opcao-desafio" data-correta="${indice === questaoAtual.indiceCorreto}">${alternativa}</button>`
        ).join("");
      gradeOpcoesDesafio.querySelectorAll(".botao-opcao-desafio").forEach((botao) => {
        botao.addEventListener("click", () => {
          const acertou = botao.getAttribute("data-correta") === "true";
          gradeOpcoesDesafio.querySelectorAll(".botao-opcao-desafio").forEach((item) => { item.classList.remove("correta", "incorreta"); });
          if (acertou) {
            botao.classList.add("correta");
            pontosEstudante += 10;
            progressoEstudos = Math.min(100, progressoEstudos + 5);
            atualizarExibicaoPontos();
            if (rotuloProgressoEstudos && barraProgressoEstudos) {
              rotuloProgressoEstudos.textContent = `${progressoEstudos}% de seu progresso!`;
              barraProgressoEstudos.style.width = `${progressoEstudos}%`;
            }
            if (mensagemRetornoDesafio) { mensagemRetornoDesafio.style.color = "#16a34a"; mensagemRetornoDesafio.textContent = "🎉 Resposta certa! Avançando..."; }
            setTimeout(() => {
              if (indiceQuestaoAtual + 1 < listaQuestoes.length) { abrirDesafioNivel(rotuloNivel, indiceQuestaoAtual + 1); } else {
                if (cartaoDesafioAtivo) { cartaoDesafioAtivo.hidden = true; cartaoDesafioAtivo.style.display = "none"; }
                if (cartaoDesafioConcluido) { cartaoDesafioConcluido.hidden = false; cartaoDesafioConcluido.style.display = "block"; }
              }
            }, 900);
          } else {
            botao.classList.add("incorreta");
            if (mensagemRetornoDesafio) { mensagemRetornoDesafio.style.color = "#dc2626"; mensagemRetornoDesafio.textContent = "🤔 Resposta incorreta! Tente novamente ou envie sua dúvida abaixo."; }
          }
        });
      });
    }
  };
  document.getElementById("botaoVoltarMaterias")?.addEventListener("click", () => { definirEtapaAtividade("catalogo"); });
  document.getElementById("botaoVoltarTrilha")?.addEventListener("click", () => { definirEtapaAtividade("trilha"); });
  document.getElementById("botaoVoltarNiveis")?.addEventListener("click", () => { definirEtapaAtividade("niveis"); });
  document.getElementById("botaoConcluirVoltarNiveis")?.addEventListener("click", () => { definirEtapaAtividade("niveis"); });
  document.getElementById("botaoRevisarDesafio")?.addEventListener("click", () => { abrirDesafioNivel(rotuloNivelAtual, 0); });
  document.querySelectorAll("[data-materia], [data-abrir-materia]").forEach((cartao) => {
    cartao.addEventListener("click", () => { const materiaSelecionada = cartao.getAttribute("data-materia") || cartao.getAttribute("data-abrir-materia") || "Matemática"; abrirTrilhaMateria(materiaSelecionada); });
  });
  const produtosLoja = [
    { nome: "Caderno", pontos: 10, categoria: "objeto", corFundo: "#a4deff", imagem: "assets/shop-caderno.png" }, { nome: "Mochila", pontos: 25, categoria: "objeto", corFundo: "rgba(64,154,186,0.45)", imagem: "assets/shop-mochila.png" }, { nome: "Fones de ouvido", pontos: 50, categoria: "eletronicos", corFundo: "rgba(0,149,255,0.22)", imagem: "assets/shop-fones.png" }, { nome: "Notebook", pontos: 800, categoria: "eletronicos", corFundo: "rgba(183,223,245,0.35)", imagem: "assets/shop-notebook.png" }, { nome: "Tênis esportivo", pontos: 100, categoria: "objeto", corFundo: "rgba(202,247,147,0.35)", imagem: "assets/shop-tenis.png" }, { nome: "Camiseta esportiva", pontos: 150, categoria: "objeto", corFundo: "rgba(187,45,240,0.22)", imagem: "assets/shop-camiseta.png" }, { nome: "Calça moletom", pontos: 120, categoria: "objeto", corFundo: "rgba(239,185,11,0.25)", imagem: "assets/shop-calca.png" }, { nome: "CD Musical", pontos: 500, categoria: "objeto", corFundo: "rgba(216,17,10,0.22)", imagem: "assets/shop-cd.png" }, { nome: "DVD Filme", pontos: 520, categoria: "objeto", corFundo: "rgba(83,52,7,0.22)", imagem: "assets/shop-dvd.png" }, { nome: "Aparelho Blu-ray", pontos: 415, categoria: "eletronicos", corFundo: "rgba(211,176,224,0.35)", imagem: "assets/shop-bluray.png" }, { nome: "Videogame PS3", pontos: 3000, categoria: "eletronicos", corFundo: "rgba(253,229,152,0.35)", imagem: "assets/shop-ps3.png" }, { nome: "Vale-presente", pontos: 80, categoria: "objeto", corFundo: "rgba(24,216,149,0.25)", imagem: "assets/shop-vale.png" }, { nome: "Cesta básica", pontos: 65, categoria: "objeto", corFundo: "rgba(247,165,147,0.3)", imagem: "assets/shop-cesta.png" }, { nome: "Refrigerante", pontos: 40, categoria: "objeto", corFundo: "rgba(205,7,178,0.22)", imagem: "assets/shop-coca.png" }, { nome: "Ovo de Páscoa", pontos: 25, categoria: "objeto", corFundo: "rgba(253,229,152,0.35)", imagem: "assets/shop-ovo.png" }, { nome: "Kit Canetinhas", pontos: 5, categoria: "objeto", corFundo: "rgba(183,223,245,0.35)", imagem: "assets/shop-canetinhas.png" }, ];
  let categoriaAtivaLoja = "todos";
  const gradeProdutosLoja = document.getElementById("gradeProdutosLoja");
  const campoBuscaLoja = document.getElementById("campoBuscaLoja");
  const mensagemRetornoLoja = document.getElementById("mensagemRetornoLoja");
  const renderizarProdutosLoja = () => {
    if (!gradeProdutosLoja) return;
    const termoBusca = (campoBuscaLoja?.value || "").toLowerCase().trim();
    const produtosFiltrados = produtosLoja.filter((produto) => {
      const correspondeCategoria = categoriaAtivaLoja === "todos" || categoriaAtivaLoja === "all" || produto.categoria === categoriaAtivaLoja;
      const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca);
      return correspondeCategoria && correspondeBusca;
    });
    gradeProdutosLoja.innerHTML = produtosFiltrados.map(
        (produto) => `<article class="cartao-item-loja" style="background: ${produto.corFundo}"> <img src="${produto.imagem}" alt="${produto.nome}" class="cartao-item-loja__imagem" /> <h4 class="cartao-item-loja__nome">${produto.nome}</h4> <p class="cartao-item-loja__pontos">${produto.pontos} pts</p> <button type="button" class="botao-resgatar-loja" data-nome="${produto.nome}" data-pontos="${produto.pontos}"> Resgatar Prêmio </button> </article>`
      ).join("");
    gradeProdutosLoja.querySelectorAll(".botao-resgatar-loja").forEach((botao) => {
      botao.addEventListener("click", () => {
        const custoPontos = Number(botao.getAttribute("data-pontos"));
        const nomeProduto = botao.getAttribute("data-nome");
        if (pontosEstudante >= custoPontos) {
          pontosEstudante -= custoPontos;
          atualizarExibicaoPontos();
          if (mensagemRetornoLoja) {
            mensagemRetornoLoja.style.color = "#16a34a";
            mensagemRetornoLoja.textContent = `🎁 Parabéns! Você resgatou "${nomeProduto}" por ${custoPontos} pts! Saldo atual: ${pontosEstudante} pts.`;
          }
        } else if (mensagemRetornoLoja) {
          mensagemRetornoLoja.style.color = "#dc2626";
          mensagemRetornoLoja.textContent = `⚠️ Saldo insuficiente para "${nomeProduto}" (${custoPontos} pts). Conclua mais atividades para ganhar pontos!`;
        }
      });
    });
  };
  renderizarProdutosLoja();
  campoBuscaLoja?.addEventListener("input", renderizarProdutosLoja);
  document.querySelectorAll("[data-categoria-loja]").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.querySelectorAll("[data-categoria-loja]").forEach((item) => item.classList.remove("ativo"));
      botao.classList.add("ativo");
      categoriaAtivaLoja = botao.getAttribute("data-categoria-loja") || "todos";
      renderizarProdutosLoja();
    });
  });
  const registrosClassificacao = [
    { posicao: "04", nome: "Jéssica Andrade", pontos: 992, avatar: "assets/avatar-rank4.png", subiu: true }, { posicao: "05", nome: "Sofia Andrade", pontos: 777, avatar: "assets/avatar-rank5.png", subiu: false }, { posicao: "06", nome: "Heitor Castro", pontos: 448, avatar: "assets/avatar-rank6.png", subiu: true }, { posicao: "07", nome: "Lucas Martins", pontos: 580, avatar: "assets/avatar-rank7.png", subiu: true }, { posicao: "08", nome: "Otávio Silva", pontos: 580, avatar: "assets/avatar-rank8.png", subiu: false }, { posicao: "09", nome: "Rebeca Andrade", pontos: 584, avatar: "assets/avatar-rank5.png", subiu: false }, { posicao: "10", nome: "João Castro", pontos: 448, avatar: "assets/avatar-rank6.png", subiu: true }, { posicao: "11", nome: "William Martins", pontos: 580, avatar: "assets/avatar-rank7.png", subiu: true }, { posicao: "12", nome: "Guilherme Silva", pontos: 580, avatar: "assets/avatar-rank8.png", subiu: false }, { posicao: "13", nome: "Samanta Atilho", pontos: 584, avatar: "assets/avatar-rank4.png", subiu: false }, { posicao: "14", nome: "Henrique Castro", pontos: 448, avatar: "assets/avatar-rank6.png", subiu: true }, { posicao: "15", nome: "Enzo Martins", pontos: 446, avatar: "assets/avatar-rank7.png", subiu: true }, { posicao: "16", nome: "Luiz Silva", pontos: 446, avatar: "assets/avatar-rank8.png", subiu: false }, { posicao: "17", nome: "Sâmila Lisboa", pontos: 445, avatar: "assets/avatar-rank4.png", subiu: false }, ];
  const listaClassificacaoGeral = document.getElementById("listaClassificacaoGeral");
  const renderizarClassificacao = (multiplicador = 1) => {
    if (!listaClassificacaoGeral) return;
    listaClassificacaoGeral.innerHTML = registrosClassificacao.map(
        (registro) => `<div class="linha-classificacao"> <div class="linha-classificacao__esquerda"> <span class="posicao-classificacao">${registro.posicao}</span> <img src="${registro.avatar}" alt="${registro.nome}" class="avatar-classificacao" /> <div> <div class="nome-classificacao">${registro.nome}</div> <div class="pontos-classificacao">${Math.round(registro.pontos * multiplicador)} pontos</div> </div> </div> <span class="selo-tendencia ${registro.subiu ? "tendencia--alta" : "tendencia--baixa"}">${registro.subiu ? "▲" : "▼"}</span> </div>`
      ).join("");
  };
  renderizarClassificacao(1);
  document.querySelectorAll("[data-periodo]").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.querySelectorAll("[data-periodo]").forEach((item) => item.classList.remove("ativo"));
      botao.classList.add("ativo");
      const periodoSelecionado = botao.getAttribute("data-periodo");
      const multiplicador = periodoSelecionado === "mes" ? 3.2 : periodoSelecionado === "semana" ? 1.5 : 1;
      renderizarClassificacao(multiplicador);
    });
  });
  const listaConversas = [
    {
      id: "bruno", nomeEstudante: "Bruno Delorence", topico: "Atividade de Operações", horario: "2 min", avatar: "assets/avatar-bruno.png", naoLida: false, mensagens: [
        { remetente: "estudante", texto: "Professora, como faço a soma de dois números?" }, { remetente: "professora", texto: "Basta pegar a quantidade e contar mais a outra!!" }, { remetente: "estudante", texto: "Verdade! Havia esquecido! Obrigado!!! :D" }, { remetente: "professora", texto: "Por nada, qualquer outra dúvida é só chamar." }, { remetente: "estudante", texto: "Tá bom professora, você é a melhor!" }, { remetente: "professora", texto: "Muito obrigada! Você também é um ótimo aluno." }, ], }, {
      id: "davi", nomeEstudante: "Davi Almeida", topico: "Atividade de Operações", horario: "5 min", avatar: "assets/avatar-david.png", naoLida: true, mensagens: [ { remetente: "estudante", texto: "Professora Tati, fiquei com dúvida na soma dos ângulos de 36°." }, ], }, {
      id: "teresa", nomeEstudante: "Teresa Souza", topico: "Atividade de Operações", horario: "8 min", avatar: "assets/avatar-theresa.png", naoLida: true, mensagens: [ { remetente: "estudante", texto: "Posso entregar a lista de revisão até amanhã?" }, ], }, {
      id: "marcos", nomeEstudante: "Marcos Oliveira", topico: "Atividade de Operações", horario: "30 min", avatar: "assets/avatar-marvin.png", naoLida: true, mensagens: [ { remetente: "estudante", texto: "Não entendi o exercício 4 da trilha de Matemática." }, ], }, {
      id: "diego", nomeEstudante: "Diego Lima", topico: "Atividade de Equações", horario: "58 min", avatar: "assets/avatar-devon.png", naoLida: false, mensagens: [ { remetente: "estudante", texto: "Obrigado pela explicação de Equações de 1º grau!" }, { remetente: "professora", texto: "Excelente evolução, Diego! Continue praticando." }, ], }, {
      id: "helena", nomeEstudante: "Helena Pena", topico: "Atividade de Operações", horario: "17 h", avatar: "assets/avatar-eleanor.png", naoLida: false, mensagens: [ { remetente: "estudante", texto: "Concluí todos os níveis da semana!" }, { remetente: "professora", texto: "Parabéns, Helena!" }, ], }, ];
  let idConversaAtiva = "bruno";
  const mensagensConversaEstudante = document.getElementById("mensagensConversaEstudante");
  const listaEntradaProfessora = document.getElementById("listaEntradaProfessora");
  const mensagensConversaProfessora = document.getElementById("mensagensConversaProfessora");
  const seloNaoLidasProfessora = document.getElementById("seloNaoLidasProfessora");
  const caixaFiltrarNaoRespondidas = document.getElementById("caixaFiltrarNaoRespondidas");
  const renderizarConversaEstudante = () => {
    if (!mensagensConversaEstudante) return;
    const conversaBruno = listaConversas.find((conversa) => conversa.id === "bruno");
    if (!conversaBruno) return;
    mensagensConversaEstudante.innerHTML = conversaBruno.mensagens.map(
        (mensagem) => `<div class="balao-conversa ${mensagem.remetente === "estudante" ? "balao-conversa--enviado" : "balao-conversa--recebido"}"> ${mensagem.texto} </div>`
      ).join("");
    mensagensConversaEstudante.scrollTop = mensagensConversaEstudante.scrollHeight;
  };
  const renderizarConversaProfessora = () => {
    if (!listaEntradaProfessora || !mensagensConversaProfessora) return;
    const apenasNaoRespondidas = caixaFiltrarNaoRespondidas?.checked;
    const totalNaoLidas = listaConversas.filter((conversa) => conversa.naoLida).length;
    if (seloNaoLidasProfessora) {
      seloNaoLidasProfessora.textContent = String(totalNaoLidas);
      seloNaoLidasProfessora.hidden = totalNaoLidas === 0;
      seloNaoLidasProfessora.style.display = totalNaoLidas === 0 ? "none" : "inline-block";
    }
    const conversasVisiveis = listaConversas.filter((conversa) =>
      !apenasNaoRespondidas ? true : conversa.naoLida || conversa.id === idConversaAtiva
    );
    listaEntradaProfessora.innerHTML = conversasVisiveis.map(
        (conversa) => `<div class="item-entrada ${conversa.naoLida ? "nao-lida" : ""} ${conversa.id === idConversaAtiva ? "ativo" : ""}" data-id-conversa="${conversa.id}"> ${conversa.naoLida ? '<span class="ponto-entrada"></span>' : ""} <img src="${conversa.avatar}" alt="${conversa.nomeEstudante}" class="avatar-entrada" /> <div class="informacoes-entrada"> <strong>${conversa.nomeEstudante}</strong> <span>${conversa.topico}</span> </div> <span class="horario-entrada">${conversa.horario}</span> </div>`
      ).join("");
    listaEntradaProfessora.querySelectorAll(".item-entrada").forEach((item) => {
      item.addEventListener("click", () => {
        idConversaAtiva = item.getAttribute("data-id-conversa") || "bruno";
        const conversaClicada = listaConversas.find((conversa) => conversa.id === idConversaAtiva);
        if (conversaClicada) {
          conversaClicada.naoLida = false;
        }
        renderizarConversaProfessora();
      });
    });
    const conversaAtiva = listaConversas.find((conversa) => conversa.id === idConversaAtiva) || listaConversas[0];
    if (conversaAtiva) {
      const avatarAtivo = document.getElementById("avatarEstudanteConversaAtiva");
      const nomeAtivo = document.getElementById("nomeEstudanteConversaAtiva");
      const topicoAtivo = document.getElementById("topicoEstudanteConversaAtiva");
      if (avatarAtivo) avatarAtivo.src = conversaAtiva.avatar;
      if (nomeAtivo) nomeAtivo.textContent = conversaAtiva.nomeEstudante;
      if (topicoAtivo) topicoAtivo.textContent = `${conversaAtiva.topico} • Turma 3C`;
      mensagensConversaProfessora.innerHTML = conversaAtiva.mensagens.map(
          (mensagem) => `<div class="balao-conversa ${mensagem.remetente === "estudante" ? "balao-conversa--recebido" : "balao-conversa--enviado"}"> ${mensagem.texto} </div>`
        ).join("");
      mensagensConversaProfessora.scrollTop = mensagensConversaProfessora.scrollHeight;
    }
  };
  renderizarConversaEstudante();
  renderizarConversaProfessora();
  caixaFiltrarNaoRespondidas?.addEventListener("change", renderizarConversaProfessora);
  document.getElementById("formularioConversaEstudante")?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campoMensagem = document.getElementById("campoConversaEstudante");
    const textoMensagem = campoMensagem.value.trim();
    if (!textoMensagem) return;
    const conversaBruno = listaConversas.find((conversa) => conversa.id === "bruno");
    conversaBruno.mensagens.push({ remetente: "estudante", texto: textoMensagem });
    conversaBruno.naoLida = true;
    conversaBruno.horario = "agora";
    campoMensagem.value = "";
    renderizarConversaEstudante();
    renderizarConversaProfessora();
  });
  document.getElementById("formularioDuvidaAtividade")?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campoDuvida = document.getElementById("campoDuvidaAtividade");
    const textoDuvida = campoDuvida.value.trim();
    if (!textoDuvida) return;
    const conversaBruno = listaConversas.find((conversa) => conversa.id === "bruno");
    conversaBruno.mensagens.push({ remetente: "estudante", texto: textoDuvida });
    conversaBruno.naoLida = true;
    conversaBruno.horario = "agora";
    campoDuvida.value = "";
    renderizarConversaEstudante();
    renderizarConversaProfessora();
    mostrarTela("estudante-conversa");
  });
  document.getElementById("formularioConversaProfessora")?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campoResposta = document.getElementById("campoConversaProfessora");
    const textoResposta = campoResposta.value.trim();
    if (!textoResposta) return;
    const conversaAtiva = listaConversas.find((conversa) => conversa.id === idConversaAtiva);
    if (conversaAtiva) {
      conversaAtiva.mensagens.push({ remetente: "professora", texto: textoResposta });
      conversaAtiva.naoLida = false;
      campoResposta.value = "";
      renderizarConversaProfessora();
      renderizarConversaEstudante();
    }
  });
  const estudantesTurma3C = [
    { numero: "#1", nome: "Agnaldo Abreu", avatar: "assets/avatar-wilson.png", presente: true }, { numero: "#2", nome: "Bruno Delorence", avatar: "assets/avatar-bruno.png", presente: true }, { numero: "#3", nome: "Carlos Eduardo", avatar: "assets/avatar-david.png", presente: true }, { numero: "#4", nome: "Darley Souza", avatar: "assets/avatar-marvin.png", presente: false }, { numero: "#5", nome: "Edmundo Brito", avatar: "assets/avatar-devon.png", presente: true }, { numero: "#6", nome: "Fernando Prado", avatar: "assets/avatar-wilson.png", presente: true }, { numero: "#7", nome: "Gabriel Rocha", avatar: "assets/avatar-david.png", presente: true }, { numero: "#8", nome: "Henrique Alves", avatar: "assets/avatar-marvin.png", presente: true }, { numero: "#9", nome: "Irineu Neves", avatar: "assets/avatar-devon.png", presente: true }, { numero: "#10", nome: "Josué Barbosa", avatar: "assets/avatar-bruno.png", presente: true }, ];
  const listaPresencaChamada = document.getElementById("listaPresencaChamada");
  const renderizarChamada = () => {
    if (!listaPresencaChamada) return;
    listaPresencaChamada.innerHTML = estudantesTurma3C.map(
        (estudante, indice) => `<label class="cartao-linha-estudante"> <div class="cartao-linha-estudante__esquerda"> <img src="${estudante.avatar}" alt="${estudante.nome}" class="cartao-linha-estudante__avatar" /> <span class="cartao-linha-estudante__numero">${estudante.numero}</span> <span class="cartao-linha-estudante__nome">${estudante.nome}</span> </div> <input type="checkbox" class="marcador-circular-presenca" data-indice="${indice}" ${estudante.presente ? "checked" : ""} /> </label>`
      ).join("");
  };
  renderizarChamada();
  document.querySelectorAll("#seletorTurmaChamada .item-selecao-turma").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.querySelectorAll("#seletorTurmaChamada .item-selecao-turma").forEach((item) => { item.classList.remove("ativo"); const caixa = item.querySelector(".caixa-selecao-turma"); if (caixa) caixa.textContent = ""; });
      botao.classList.add("ativo");
      const caixa = botao.querySelector(".caixa-selecao-turma");
      if (caixa) caixa.textContent = "✓";
      const nomeTurma = botao.getAttribute("data-turma");
      const tituloCabecalhoChamada = document.getElementById("tituloCabecalhoChamada");
      if (tituloCabecalhoChamada) {
        tituloCabecalhoChamada.textContent = `Chamada: ${nomeTurma}`;
      }
    });
  });
  document.getElementById("botaoSalvarChamada")?.addEventListener("click", () => {
    const retornoChamada = document.getElementById("mensagemRetornoChamada");
    if (retornoChamada) {
      retornoChamada.textContent = "✅ Chamada registrada com sucesso! Relatório de frequência sincronizado com a coordenação.";
      setTimeout(() => { retornoChamada.textContent = ""; }, 5000);
    }
  });
  const dadosNotasEstudante = [
    { disciplina: "Mat", frequencia: "90%", nota: "8,1" }, { disciplina: "Port", frequencia: "85%", nota: "8,4" }, { disciplina: "Geo", frequencia: "93%", nota: "7,2" }, { disciplina: "Bio", frequencia: "89%", nota: "6,1" }, { disciplina: "Fís", frequencia: "98%", nota: "9,0" }, { disciplina: "Quí", frequencia: "99,9%", nota: "9,6" }, { disciplina: "Hist", frequencia: "86%", nota: "8,5" }, { disciplina: "Ing", frequencia: "84%", nota: "8,8" }, { disciplina: "Art", frequencia: "76%", nota: "9,3" }, { disciplina: "Mús", frequencia: "81%", nota: "4,1" }, ];
  const seletorEstudanteNotas = document.getElementById("seletorEstudanteNotas");
  const corpoTabelaNotasProfessora = document.getElementById("corpoTabelaNotasProfessora");
  const tituloEstudanteSelecionadoNotas = document.getElementById("tituloEstudanteSelecionadoNotas");
  if (seletorEstudanteNotas) {
    seletorEstudanteNotas.innerHTML = estudantesTurma3C
      .slice(0, 8).map(
        (estudante) => `<div class="cartao-linha-estudante" style="cursor:pointer" data-nota-estudante="${estudante.nome}"> <div class="cartao-linha-estudante__esquerda"> <img src="${estudante.avatar}" alt="${estudante.nome}" class="cartao-linha-estudante__avatar" /> <span class="cartao-linha-estudante__numero">${estudante.numero}</span> <span class="cartao-linha-estudante__nome">${estudante.nome}</span> </div> <span>→</span> </div>`
      ).join("");
    seletorEstudanteNotas.querySelectorAll("[data-nota-estudante]").forEach((linha) => {
      linha.addEventListener("click", () => {
        const nomeEstudante = linha.getAttribute("data-nota-estudante");
        if (tituloEstudanteSelecionadoNotas) {
          tituloEstudanteSelecionadoNotas.textContent = `Notas: ${nomeEstudante}`;
        }
      });
    });
  }
  if (corpoTabelaNotasProfessora) {
    corpoTabelaNotasProfessora.innerHTML = dadosNotasEstudante.map(
        (linhaNota) => `<tr> <td><span class="barra-linha"></span><strong>${linhaNota.disciplina}</strong></td> <td>${linhaNota.frequencia}</td> <td><input type="text" class="entrada-nota" value="${linhaNota.nota}" /></td> </tr>`
      ).join("");
  }
  document.getElementById("botaoSalvarNotas")?.addEventListener("click", () => {
    const retornoNotas = document.getElementById("mensagemRetornoNotas");
    if (retornoNotas) {
      retornoNotas.textContent = "✅ Boletim atualizado com sucesso no sistema IN AULA!";
      setTimeout(() => { retornoNotas.textContent = ""; }, 5000);
    }
  });
  document.getElementById("formularioPerfilEstudante")?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const retornoPerfil = document.getElementById("retornoPerfilSalvo");
    if (retornoPerfil) {
      retornoPerfil.textContent = "✅ Dados do perfil atualizados com sucesso!";
      setTimeout(() => { retornoPerfil.textContent = ""; }, 4000);
    }
  });
});
