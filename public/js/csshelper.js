const navbarHeroHamburger = document.querySelector('.navbar--hamburger');
const navbarFixed = document.querySelector('.navbar--fixed');
const aside = document.querySelector('.aside--body');
const asideCloseButton = document.querySelector('.aside--close');
const menuItem = document.querySelectorAll('.menu--navbar-item');
const asideLink = document.querySelectorAll('.aside--item');
const windowHeight = window.innerHeight;

// Salva um modelo de card já existente na página
const cardTemplate = document.querySelector(".menu--item");

const menuPages = [
  // Entradas
  [{
    title: "Bruschetta de tomate e chutney de manga", message: "Uma torrada de pão italiano com tomate fresco picado e um chutney de manga indiano, finalizado com um toque de azeite e manjericão."
  }, {
    title: "Caponata indiana", message: "Uma variação da caponata italiana com berinjela, cebola, pimentão e tomate, temperada com especiarias indianas e servida com pão naan."
  }, {
    title: "Samosa de queijo brie com geleia de pimenta", message: "Uma samosa indiana recheada com queijo brie derretido e servida com uma geleia de pimenta doce e picante."
  }, {
    title: "Ceviche de camarão com manga", message: "Um ceviche peruano com camarões frescos, manga picada, cebola roxa e coentro, finalizado com um toque de azeite de oliva."
  }, {
    title: "Tikka de frango com tomate e manjericão", message: "Um prato indiano de frango marinado em iogurte e especiarias, grelhado na brasa e servido com um molho de tomate e manjericão italiano."
  }, {
    title: "Naan com tapenade de azeitona", message: "Pão naan indiano servido com uma tapenade de azeitona italiana (uma pasta de azeitonas pretas, anchovas, alcaparras, alho e azeite de oliva)."
  }],
  // Pratos Principais
  [{
    title: "Risoto de cogumelos", message: "Arroz arbóreo preparado com cogumelos frescos, parmesão e um toque de azeite de trufas."
  }, {
    title: "Massa com frutos do mar", message: "Massa italiana com frutos do mar (camarão, lula, polvo e mexilhão) em um molho de tomate levemente picante."
  }, {
    title: "Bife ancho com batatas rústicas", message: "Bife ancho argentino grelhado, acompanhado de batatas rústicas assadas com alecrim e alho."
  }, {
    title: "Tandoori de cordeiro", message: "Tandoori indiano de cordeiro marinado em iogurte e especiarias, assado no forno tandoor e servido com arroz basmati."
  }, {
    title: "Hambúrguer de cogumelos", message: "Hambúrguer vegetariano de cogumelos portobello grelhados, servido em um pão de brioche com queijo cheddar e maionese de alho."
  }, {
    title: "Frango ao molho de laranja", message: "Peito de frango grelhado, acompanhado de um molho cítrico de laranja e arroz com amêndoas."
  }],

  // Sobremesas
  [{
    title: "Tiramisu", message: "Uma sobremesa italiana feita com camadas de biscoito champanhe, creme de mascarpone e café."
  },
  {
    title: "Panna Cotta de Manga", message: "Uma sobremesa italiana feita com creme de leite, açúcar, baunilha e manga fresca."
  },
  {
    title: "Ras Malai", message: "Uma sobremesa indiana feita com bolas de queijo fresco mergulhadas em um xarope de cardamomo e leite com uma pitada de açafrão."
  },
  {
    title: "Gulab Jamun", message: "Uma sobremesa indiana feita com bolas de massa frita em xarope de açúcar e cardamomo."
  },
  {
    title: "Torta Caprese", message: "Uma sobremesa italiana feita com amêndoas, chocolate e açúcar."
  },
  {
    title: "Gajar Ka Halwa", message: "Uma sobremesa indiana feita com cenouras raladas cozidas em leite com açúcar, manteiga e cardamomo."
  }],

  // Bebidas
  [{
    title: "Chianti Classico", message: "Vinho tinto seco produzido na região da Toscana, na Itália. É um vinho encorpado e aromático, com notas de frutas vermelhas e especiarias."
  }, {
    title: "Lassi de manga", message: "Bebida indiana feita com iogurte e manga, levemente adoçada e servida bem gelada. É refrescante e levemente ácida."
  }, {
    title: "Negroni", message: "Coquetel italiano feito com gin, vermute e Campari, servido com uma fatia de laranja. É um coquetel forte e amargo, ideal para quem gosta de sabores intensos."
  }, {
    title: "Chá masala", message: "Chá indiano feito com uma mistura de especiarias, como canela, cravo, cardamomo e gengibre. É uma bebida quente e aromática, perfeita para acompanhar uma sobremesa."
  }, {
    title: "Limoncello", message: "Licor italiano feito com limão siciliano, açúcar e álcool. É uma bebida doce e cítrica, servida gelada como digestivo."
  }]

]

const openAside = () => {
  aside.classList.remove("hidden")
}

const closeAside = () => {
  aside.classList.add("hidden")
}

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;

  if (scrollTop > windowHeight) {
    // Após o fold
    navbarFixed.classList.remove("hidden")
  } else {
    // Antes do fold
    navbarFixed.classList.add("hidden")
  }
});

navbarHeroHamburger.addEventListener('click', () => { openAside() })
navbarFixed.addEventListener('click', () => { openAside() })

menuItem.forEach(item => {
  item.addEventListener("click", (e) => {
    const target = e.target;

    // Retira o background de todos os itens e reseta o dataset
    menuItem.forEach(item => {
      item.dataset.active = "false"
    })

    // Ativa apenas o background e dataset do elemento necessário
    target.dataset.active = "true";

    // Salva o numero da página de menu que deve ser renderizada
    const page = parseInt(target.dataset.value);


    // Limpa o cardápio
    menuBody = document.querySelector(".menu--body");

    menuBody.innerHTML = "";


    // Repopula o cardápio com os pratos corretos
    for (let i = 0; i < menuPages[page].length; i++) {
      const item = menuPages[page][i];
      console.log(item)
      // Renderiza o item
      itemRenderizado = document.createElement("li")
      itemRenderizado.innerHTML = cardTemplate.innerHTML
      itemRenderizado.classList.add("menu--item")

      itemRenderizado.querySelector(".menu--item-header").innerHTML = item.title;
      itemRenderizado.querySelector(".menu--item-message").innerHTML = item.message;

      menuBody.appendChild(itemRenderizado)

    };

  })
})

asideCloseButton.addEventListener("click", () => { closeAside() })
asideLink.forEach(link => {
  link.addEventListener("click", () => { closeAside() })
});
