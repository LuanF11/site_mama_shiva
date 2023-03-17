// Salva um modelo de card já existente na página
const cardTemplate = document.querySelector(".menu--item")

// Quantos cards aparecem por vez no cardápio
const itemsPerMenuIndex = 6;

const menuItem = document.querySelectorAll(".menu--navbar-item");
const menuSlider = document.querySelector(".menu--slider");
const menuBack = document.getElementById("menu_slider_back");
const menuForw = document.getElementById("menu_slider_forw");

const changeIndex = (direction) => {
    // Caso seja uma mudança de página, apenas carrega a página 0 do menu destino
    if (direction == "changeInPage") {
        index = 0;
        menuSlider.dataset.index = 0;
    }

    // Determina qual o índice máximo de páginas
    var page = document.querySelector(".menu--navbar-item[data-active='true']").dataset.value
    var maxIndex = Math.floor(menuPages[page].length / itemsPerMenuIndex) - 1;

    // Determina qual o índice atual
    var index = parseInt(menuSlider.dataset.index) || maxIndex;

    // Calcula qual será o próximo índice
    index += (direction == "forw") ? 1 : -1;

    // Valida o próximo índice
    if (index < 0) { index = 0 };
    if (index > maxIndex || index == "max") { index = maxIndex };


    // Atualiza a exibição dos controles e o index no html
    menuSlider.dataset.index = index;

    menuSlider.querySelector("span").innerHTML = (index + 1) + "/" + (maxIndex + 1);
    if (index >= maxIndex) { menuSlider.dataset.index = "max" }

    const sliderBackCss = document.querySelector('[data-index="0"] #menu_slider_back') || false;
    const sliderForwCss = document.querySelector('[data-index="max"] #menu_slider_forw') || false;

    menuBack.style.opacity = (sliderBackCss) ? 0 : 1;
    menuForw.style.opacity = (sliderForwCss) ? 0 : 1;

    // Renderiza a respectiva página
    renderMenu(index)
}

const renderMenu = (index = 0) => {
    // Detecta em qual pagina (entradas, pratos principais...) o menu está
    var page = document.querySelector(".menu--navbar-item[data-active='true']").dataset.value;

    // Determina quais itens da página serão renderizados, de acordo com o índice
    var itemsToRender = menuPages[page].slice((index * itemsPerMenuIndex), ((index + 1) * itemsPerMenuIndex) - 1)

    // Limpa o cardápio
    menuBody = document.querySelector(".menu--body");

    menuBody.innerHTML = "";

    // Repopula o cardápio com os pratos corretos
    itemsToRender.forEach(item => {
        // Renderiza o item
        itemRenderizado = document.createElement("li")
        itemRenderizado.innerHTML = cardTemplate.innerHTML
        itemRenderizado.classList.add("menu--item")

        itemRenderizado.querySelector(".menu--item-header").innerHTML = item.title;
        itemRenderizado.querySelector(".menu--item-message").innerHTML = item.message;

        menuBody.appendChild(itemRenderizado)
    });
}

menuItem.forEach(item => {
    item.addEventListener("click", (e) => {
        const target = e.target;

        // Retira o background de todos os itens e reseta o dataset
        menuItem.forEach(item => {
            item.dataset.active = "false"
        })

        // Ativa apenas o background e dataset do elemento necessário
        target.dataset.active = "true";

        // Renderiza o menu
        changeIndex("changeInPage");

    })
})

menuBack.addEventListener("click", () => { changeIndex() })
menuForw.addEventListener("click", () => { changeIndex("forw") })

asideCloseButton.addEventListener("click", () => { closeAside() })
asideLink.forEach(link => {
    link.addEventListener("click", () => { closeAside() })
});

faq.forEach(faqHeader => {
    faqHeader.addEventListener("click", e => {
        console.log(e)

        faq.forEach(faqItem => {
            faqItem.dataset.active = "false"
        })

        faq[e.target.dataset.value].dataset.active = "true";
    })
})

const menuPages = [
    // Entradas
    [{ title: "Bruschetta de tomate e chutney de manga", message: "Uma torrada de pão italiano com tomate fresco picado e um chutney de manga indiano, finalizado com um toque de azeite e manjericão." }, { title: "Caponata indiana", message: "Uma variação da caponata italiana com berinjela, cebola, pimentão e tomate, temperada com especiarias indianas e servida com pão naan." }, { title: "Samosa de queijo brie com geleia de pimenta", message: "Uma samosa indiana recheada com queijo brie derretido e servida com uma geleia de pimenta doce e picante." }, { title: "Ceviche de camarão com manga", message: "Um ceviche peruano com camarões frescos, manga picada, cebola roxa e coentro, finalizado com um toque de azeite de oliva." }, { title: "Tikka de frango com tomate e manjericão", message: "Um prato indiano de frango marinado em iogurte e especiarias, grelhado na brasa e servido com um molho de tomate e manjericão italiano." }, { title: "Naan com tapenade de azeitona", message: "Pão naan indiano servido com uma tapenade de azeitona italiana (uma pasta de azeitonas pretas, anchovas, alcaparras, alho e azeite de oliva)." }, { title: "Antipasti misti", message: "Uma seleção de aperitivos italianos, incluindo prosciutto, salame, queijo parmesão, azeitonas e picles." }, { title: "Pakoras de batata-doce", message: "Um aperitivo indiano feito com fatias de batata-doce empanadas e fritas, servidas com molho de iogurte e hortelã." }, { title: "Caprese com pesto", message: "Fatias de tomate fresco e queijo mussarela, cobertas com pesto de manjericão e finalizadas com azeite de oliva e flor de sal." }, { title: "Samosa de frango", message: "Uma samosa indiana recheada com frango desfiado e temperado, servida com um chutney de coentro e hortelã." }, { title: "Polenta frita com molho de tomate", message: "Fatias de polenta italiana empanadas e fritas, servidas com um molho de tomate caseiro e finalizadas com queijo parmesão ralado." }, { title: "Bhaji de cebola", message: "Um aperitivo indiano feito com cebolas fatiadas empanadas e fritas, servidas com um chutney de tamarindo doce e picante." }],
    // Pratos Principais
    [{ title: "Risoto de cogumelos", message: "Arroz arbóreo preparado com cogumelos frescos, parmesão e um toque de azeite de trufas." }, { title: "Massa com frutos do mar", message: "Massa italiana com frutos do mar (camarão, lula, polvo e mexilhão) em um molho de tomate levemente picante." }, { title: "Bife ancho com batatas rústicas", message: "Bife ancho argentino grelhado, acompanhado de batatas rústicas assadas com alecrim e alho." }, { title: "Tandoori de cordeiro", message: "Tandoori indiano de cordeiro marinado em iogurte e especiarias, assado no forno tandoor e servido com arroz basmati." }, { title: "Hambúrguer de cogumelos", message: "Hambúrguer vegetariano de cogumelos portobello grelhados, servido em um pão de brioche com queijo cheddar e maionese de alho." }, { title: "Frango ao molho de laranja", message: "Peito de frango grelhado, acompanhado de um molho cítrico de laranja e arroz com amêndoas." }, { title: "Frango à Parmegiana", message: "Peito de frango empanado, coberto com molho de tomate e queijo mussarela gratinado, servido com espaguete ao alho e óleo." }, { title: "Lasanha à Bolonhesa", message: "Lasanha recheada com molho à bolonhesa (carne moída, tomate e temperos), queijo mussarela e molho branco, gratinada no forno." }, { title: "Moussaka", message: "Prato grego com camadas de berinjela, carne moída, tomate e molho branco, gratinado com queijo parmesão." }, { title: "Frango Tikka Masala", message: "Frango marinado em iogurte e especiarias indianas, grelhado na brasa e servido com um molho cremoso de tomate, cebola e especiarias, acompanhado de arroz basmati." }, { title: "Carbonara", message: "Massa italiana com bacon, queijo parmesão, gemas de ovo e pimenta preta, em um molho cremoso e saboroso." }, { title: "Korma de Cordeiro", message: "Prato indiano de cordeiro cozido em um molho cremoso de castanha de caju, especiarias e iogurte, acompanhado de arroz basmati." }],

    // Sobremesas
    [{ title: "Tiramisu", message: "Uma sobremesa italiana feita com camadas de biscoito champanhe, creme de mascarpone e café." }, { title: "Panna Cotta de Manga", message: "Uma sobremesa italiana feita com creme de leite, açúcar, baunilha e manga fresca." }, { title: "Ras Malai", message: "Uma sobremesa indiana feita com bolas de queijo fresco mergulhadas em um xarope de cardamomo e leite com uma pitada de açafrão." }, { title: "Gulab Jamun", message: "Uma sobremesa indiana feita com bolas de massa frita em xarope de açúcar e cardamomo." }, { title: "Torta Caprese", message: "Uma sobremesa italiana feita com amêndoas, chocolate e açúcar." }, { title: "Gajar Ka Halwa", message: "Uma sobremesa indiana feita com cenouras raladas cozidas em leite com açúcar, manteiga e cardamomo." }, { title: "Cannoli", message: "Uma sobremesa italiana feita com uma massa enrolada e crocante recheada com creme de ricota, açúcar e baunilha." }, { title: "Kheer", message: "Uma sobremesa indiana feita com arroz cozido em leite com açúcar, cardamomo e pistache." }, { title: "Pudim de Leite", message: "Uma sobremesa brasileira feita com leite condensado, leite, ovos e açúcar, cozido em banho-maria e servido gelado." }, { title: "Cassata Siciliana", message: "Uma sobremesa italiana feita com sorvete de baunilha, frutas cristalizadas e pistache em camadas dentro de uma forma forrada com pão de ló." }, { title: "Laddu", message: "Uma sobremesa indiana feita com uma massa de farinha de grão de bico e açúcar, em formato de bolinhas, com opções de recheio como nozes e cardamomo." }, { title: "Torta de Limão", message: "Uma sobremesa americana feita com uma base de biscoito, recheio de limão e cobertura de chantilly." }],

    // Bebidas
    [{ title: "Chianti Classico", message: "Vinho tinto seco produzido na região da Toscana, na Itália. É um vinho encorpado e aromático, com notas de frutas vermelhas e especiarias." }, { title: "Lassi de manga", message: "Bebida indiana feita com iogurte e manga, levemente adoçada e servida bem gelada. É refrescante e levemente ácida." }, { title: "Negroni", message: "Coquetel italiano feito com gin, vermute e Campari, servido com uma fatia de laranja. É um coquetel forte e amargo, ideal para quem gosta de sabores intensos." }, { title: "Chá masala", message: "Chá indiano feito com uma mistura de especiarias, como canela, cravo, cardamomo e gengibre. É uma bebida quente e aromática, perfeita para acompanhar uma sobremesa." }, { title: "Limoncello", message: "Licor italiano feito com limão siciliano, açúcar e álcool. É uma bebida doce e cítrica, servida gelada como digestivo." }, { title: "Gin Tônica", message: "Coquetel italiano feito com gin e tônica, servido com uma fatia de limão. É um coquetel refrescante e levemente amargo, ideal para dias quentes." }, { title: "Lassi de rosas", message: "Bebida indiana feita com iogurte, água de rosas e açúcar, servida bem gelada. É uma bebida delicada e aromática." }, { title: "Bellini", message: "Coquetel italiano feito com suco de pêssego e espumante. É um coquetel suave e frutado, perfeito para brindar." }, { title: "Chá chai", message: "Chá indiano feito com leite, chá preto e uma mistura de especiarias, como cardamomo, canela, cravo e gengibre. É uma bebida quente e reconfortante." }, { title: "Spritz", message: "Coquetel italiano feito com Aperol, prosecco e água com gás, servido com uma fatia de laranja. É um coquetel leve e refrescante, ideal para happy hour." }, { title: "Lassi salgado", message: "Bebida indiana feita com iogurte, água, sal e temperos, como cominho e coentro. É uma bebida salgada e refrescante, perfeita para acompanhar uma refeição picante." }, { title: "Amaro", message: "Licor italiano amargo feito com ervas e especiarias, como absinto, cardamomo e canela. É uma bebida forte e complexa, servida como digestivo." }]
];