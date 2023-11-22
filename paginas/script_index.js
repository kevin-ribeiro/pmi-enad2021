var checkboxTheme = document.getElementById('chk');

function alterarTema() {
  const bodyColor = getComputedStyle(document.documentElement).getPropertyValue('--body-color');
  if (bodyColor != '#FFFFFF') {
    document.documentElement.style.setProperty("--body-color", "#FFFFFF");
  } else {
    document.documentElement.style.setProperty("--body-color", '#010409');
  }
  const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
  if (borderColor != '#BBBBBB') {
    document.documentElement.style.setProperty("--border-color", "#BBBBBB");
  } else {
    document.documentElement.style.setProperty("--border-color", '#21262D');
  }
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
  if (textColor != 'white') {
    document.documentElement.style.setProperty("--text-color", "white");
  } else {
    document.documentElement.style.setProperty("--text-color", '#010409');
  }
  const titleColor = getComputedStyle(document.documentElement).getPropertyValue('--title-color');
  if (titleColor != '#0054ad') {
    document.documentElement.style.setProperty("--title-color", "#0054ad");
  } else {
    document.documentElement.style.setProperty("--title-color", '#007afc');
  }
  const destaqueColor = getComputedStyle(document.documentElement).getPropertyValue('--destaque-color');
  if (destaqueColor != '#bc3a3e') {
    document.documentElement.style.setProperty("--destaque-color", "#bc3a3e");
  } else {
    document.documentElement.style.setProperty("--destaque-color", '#b11016');
  }
  const hoverScrollColor = getComputedStyle(document.documentElement).getPropertyValue('--hover-scroll-color');
  if (hoverScrollColor != '#cccccc') {
    document.documentElement.style.setProperty("--hover-scroll-color", "#cccccc");
  } else {
    document.documentElement.style.setProperty("--hover-scroll-color", '#1a1a35');
  }
  const gradientSchemeColors = getComputedStyle(document.documentElement).getPropertyValue('--gradient-colors');
  if (gradientSchemeColors != '#FFFFFF, #EEEEEE') {
    document.documentElement.style.setProperty("--gradient-colors", "#FFFFFF, #EEEEEE");
  } else {
    document.documentElement.style.setProperty("--gradient-colors", '#0c0c1c, #02050b');
  }

  // Depois de alterar as cores, salve o estado atual no localStorage
  const isDarkMode = getComputedStyle(document.documentElement).getPropertyValue('--body-color') == '#FFFFFF';
  localStorage.setItem('darkMode', isDarkMode);
}

window.onload = function() {
  var checkboxTheme = document.getElementById('chk');
  if (checkboxTheme) {
    checkboxTheme.addEventListener('change', alterarTema);

    // Verifique o localStorage quando a página for carregada
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      checkboxTheme.checked = true;
      alterarTema();
    }
  }
};