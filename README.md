# Temas e Dark Mode 

<p align="center">
	<img src="/app/public/images/themes-with-sass dark-mode.gif" width="49%" style="padding-right: 2%"/>
  	<img src="/app/public/images/themes-with-sass theme-colors.gif" width="49%" style="padding-left: 2%"/> 
</p>

**Link do Projeto:** [Temas e Dark Mode](http://theme-with-sass.s3-website-sa-east-1.amazonaws.com/)

## Observações importantes antes de começar

Este projeto é derivado de um teste que eu havia feito já há um bom tempo e em que era necessário ser realizado em JS puro, sem uso de qualquer framework ou biblioteca externa. Então, não tenha como modelo o JS deste projeto para os seus, tanto que devo transpor isso para algum framework/biblioteca futuramente como: Angular, React.

## Introdução

No geral este seria um projeto bem simples, o famoso CRUD, se não fosse pela funcionalidade do dark mode e temas. Na página de formulário temos os campos do usuários e na página de listagem, uma tabela com os usuários cadastrados e opções para editar e remover. E claro, o mais importante aqui, o menu para alterar o sistema inteiro para dark mode e outras cores.

## Motivação

Houve basicamente 3 motivações para fazer este projeto. 

- A primeira tem muito a ver até com o fato de eu ter decidido seguir pela carreira de front-end, porque como front-end, CSS sempre foi uma das coisas que eu mais amei, por se tratar muito da parte visual, o que torna-se algo mais "palpável" e consigo mostrar para outras pessoas.

- A segunda está relacionada a uma apresentação voluntária que iria fazer no local onde trabalho. Eu já tinha conhecimentos sobre Sass, mas era algo mais básico, então queria me preparar melhor para ir mais além, explorar mais os limites dos pré-processadores e levar um exemplo que as pessoas pudessem se interessar, até porque eu acredito que exemplos são imprescindíveis e são uma das melhores formas das pessoas se interessarem e aprender, independente do assunto.

- A terceira surgiu simplesmente da curiosidade para saber como era feito o dark mode que é uma das coisas que sempre utilizo em qualquer sistema que tenha esta funcionalidade. Então eu queria saber quais tecnologias eram necessárias para fazer isso e o quão complexo isso poderia ser.

##  Solução (Hora de desvendar esse mistério)

Para fazer tudo isso funcionar, vamos utilizar o Sass, as variáveis CSS e um pouquinho de Javascript, mas juro que é bem pouco. 

A função do Sass é organizar melhor nosso código, deixá-lo mais limpo e facilitar a manutenibilidade, e aqui não vai ser diferente.

A função das variáveis CSS no primeiro momento pode parecer um pouco com a dos pré-processadores, mas não se engane. A maior diferença entre eles está em ser entendido pelo navegador, porque no caso dos pré-processadores (Sass), os navegadores não conseguem entender essa linguagem, por isso o Sass precisa ser pré-processado e transformado em CSS. Já as variáveis CSS são entendidas pelo navegador, porque eles fazem parte do próprio CSS. 

###  1º passo (Criar váriável map no Sass)

Então basicamente o que vamos fazer é criar uma variável no Sass do tipo map, que vai ser basicamente uma lista de objetos para quem está acostumado com as linguagens de programação convencionais. Ela vai ser responsável por guardar nossos temas e as cores utilizadas em cada um.

<p align="center">
	<img src="/app/public/images/passo1.png" width="100%"/> 
</p>

###  2º passo (Criar function para percorrer o map)

Criar uma function no Sass que vai percorrer toda nossa lista de objetos para acessar determinado valor. 
**OBS:** Essa function será recursiva, logo vc poderá criar basicamente encadeamentos infinitos na variável map que essa function vai conseguir acessar.

<p align="center">
	<img src="/app/public/images/passo2.png" width="100%"/> 
</p>

###  3º passo (Criar loop para percorrer e gerar os temas)

Aqui as coisas começam a ficar mais interessantes! Nós vamos fazer um loop no próprio Sass no qual ele vai percorrer toda a lista de temas e criar um data attribute para cada tema.

<p align="center">
	<img src="/app/public/images/passo3.png" width="100%"/> 
</p>

###  4º passo (Gerar as variáveis CSS para cada item do loop) 

Como vimos no passo anterior, conseguimos gerar seletores para cada tema, mas eles ainda não tem nada dentro deles. Então, esse passo é basicamente criar variáveis CSS dentro desse loop para cada item de cor que guardamos na variável de tema.

<p align="center">
	<img src="/app/public/images/passo4.png" width="100%"/> 
</p>

###  5º passo (Utilizar as variáveis CSS nos elementos HTML) 

Agora que já criamos todas variáveis CSS, chegou a hora de utilizá-las. E essa é uma das partes mais simples. é só adicionar o `var(nome_da_variavel)` no atributo que você quiser como na imagem abaixo.

<p align="center">
	<img src="/app/public/images/passo5.png" width="100%"/> 
</p>

###  6º passo (rodar o Sass)

É algo que pode ser óbvio para muitos, mas até os mais experientes podem esquecer. Neste passo você precisa rodar o Sass para gerar o arquivo CSS com todos os temas e variáveis CSS que você configurou.

<p align="center">
	<img src="/app/public/images/passo6.png" width="100%"/> 
</p>

###  7º passo (adicionar o `data-theme`  com o tema default) 

No 3º passo geramos vários `data-theme` com base na nossa variável de tema. Agora o que temos que fazer é simplesmente adicionar o `data-theme` com o tema default que a gente queira na tag `<html>` .

<p align="center">
	<img src="/app/public/images/passo7.png" width="100%"/> 
</p>

###  Passo Final (Javascript eu escolho você!) 

Com o 7º passo você já consegue alterar os temas manualmente. Para alterar basta inspecionar a tela (tecla F12) e alterar o valor do `data-theme` da tag `<html>`  para o valor de algum outro theme gerado, mas vamos finalizar isso com a cereja do bolo. 

Lembra que eu disse que tinha um pouco de Javascript? Pois é, chegou a vez dele brilhar, mesmo que por pouco tempo rs. 

Basta criar uma função que recebe o nome de um `data-theme` e dentro dela alterar o valor do `data-theme` da tag `<html>` e salvar isso no Local Storage. O Local Storage é uma espécie de cache do browser e ele é muito importante para salvarmos as preferências do usuário para ele não precisar ficar alterando o tema toda vez que acessar o sistema. Assim, ao fechar o browser e abrir novamente, basta recuperarmos o `data-theme` salvo no Local Storage e alterar o `data-theme` da tag  `<html>`.

<p align="center">
	<img src="/app/public/images/passo final.png" width="100%"/> 
</p>

**Chegou a hora de ver a mágica acontecer!** Repare na tag `<html>` , `<body>` e seus atributos na parte debaixo:

<p align="center">
	<img src="/app/public/images/themes-with-sass inspect.gif" width="100%"/> 
</p>


## Bônus ([Dark theme - Material Design](https://material.io/design/color/dark-theme.html))

Antes de tudo é bom deixar claro que não sou UI/UX Designer, mas vamos lá.
Você deve ter percebido que no código o dark mode nada mais é do que um tema normal como qualquer outro, mas a implementação do dark mode em específico foi baseado no [material design](https://material.io/design/color/dark-theme.html) do Google e inspirado no **YouTube**. 

Porque é importante dizer isso? Porque muita gente pode achar que é fácil implementar esse tipo de funcionalidade. "É só colocar o fundo em preto e as letras em branco". Não, não é bem assim que funciona. Fazer a funcionalidade de temas realmente não é difícil, mas implementar do jeito certo, seguindo os padrões de design é bem mais complicado. 
Não vou me alongar muito mais, mas aqui vai uma breve explicação com alguns dos motivos de não ser tão fácil assim:
 
- O contraste do preto e branco ainda é muito forte, então colocar praticamente só essas duas cores não vai ficar muito bom.

- Você vai precisar mais do que 2 ou 3 cores para alterar todo o sistema, já que você precisa diferenciar várias camadas do seu sistema como: **navbar, header, footer, modal, popover, etc.** Se fizer assim, você não vai saber onde começa, termina certo elemento ou o que está sendo sobreposto e provavelmente vai ter que apelar para alguma técnica não convencional (gambiarra) para consertar isso. Então minha dica é: trabalhe mais com os tons de cinza.

- É importante manter a cor primária do seu sistema sempre que possível, para preservar a identidade dele, mesmo que seja um detalhe na tela. Quer um exemplo? Vá até algum canal do **YouTube** em que você **não** esteja inscrito. Se você está com o modo noturno **inativo** repare que o botão **INSCREVER-SE** está com o fundo vermelho. Agora ative o modo noturno. Repare que o botão ainda continuou em vermelho.

## Conclusão


## Dúvidas?

Algumas dúvidas que podem ter surgido:

- É necessário ter o atributo com o nome `data-theme` na tag `<html>` para funcionar?
	> Não, isso foi só uma preferência minha, pode ficar à vontade para colocar o nome que quiser.
	
- É possível fazer isso somente com Sass?
	> Não, até porque na verdade você consegue fazer isso sem nenhum pré-processador. Como falamos lá o início a função do Sass é organizar melhor nosso código, deixá-lo mais limpo e facilitar a manutenibilidade. Então basicamente sua função é facilitar o nosso trabalho e deixá-lo mais escalável. Agora se perguntar se tem algo que faça a mesma coisa que o Sass, no momento eu diria que não sei. Para saber se existe outra que faça isso, você deveria pesquisar se os outros pré-processadores permitem a utilização de algumas características que utilizamos no Sass como a variável do tipo map(array de objetos) e as functions para percorrer toda a lista.
	
- Essa é a única forma de gerar temas? Porque escolheu essa?
	> Não, existem outras formas, inclusive quando realizei a pesquisa de como fazer isso, estava em teste uma solução nativa nos browsers. 
	Eu escolhi por vários motivos, que são os seguintes: eu já tinha uma boa noção de Sass e queria colocar isso em prática, parecia ser uma forma relativamente simples e já não era tão recente assim para ter problema de cross-browser (funcionamento em vários navegadores).
	
- É necessário criar tantos atributos e encadeamentos dentro da variável de temas?
	> Não, e eu acho que essa pergunta é muito interessante, porque na verdade pode funcionar tanto com poucos quanto com muitos e eu tirei uma conclusão disso durante o desenvolvimento.
	Bom, você pode simplesmente criar dois atributos de cores dentro de cada tema (primária e secundária) e cada tema vai ficar alternando entre essas duas cores em todos os elementos do sistema, mas você tem que ter uma coisa muito importante em mente. A Lógica é inversamente proporcional, quanto menos atributos e encadeamentos você tiver, mais generalizado ficam as cores vinculadas em cada elemento, mas fica mais fácil de alterar, pois você tem menos atributos para criar e alterar, porque se você decidir alterar uma cor, vários elementos sofrerão essa alteração. Já se fizer o contrário, mais atributos e encadeamentos, menos generalizado fica, logo ao alterar para determinado tema, você pode simplesmente alterar a cor somente dos botões e não alterar nenhum outro elemento do sistema, já que agora existe uma variável(cor) dentro do tema para tratar apenas dos botões, porém isso pode ficar um pouco mais difícil de dar manutenção dependendo do seu ponto de vista, pois você irá criar a alterar muito mais atributos.
	Concluindo, na minha opinião ainda sim compensa muito mais criar mais atributos e encadeamentos, porque a dor que você terá ao criar ou alterar um novo tema é pequeno se comparado ao quão flexível você pode deixar eles, até porque é inevitável que você vá usar apenas 2 ou 3 cores por exemplo num sistema, porque você ainda deve ter variações dessas cores ao longo do sistema, sejam elas mais claras ou mais escuras como vimos no caso do dark mode.

- É possível usar esta abordagem apenas com cores?
	> Não, porque tanto a variável do tipo map do Sass quanto as variáveis CSS aceitam quaisquer valores, então use sua criatividade. Quer mais um exemplo de uso? Você poderia criar uma variável que controlasse o tamanho da fonte de todos os elementos do sistema, como um recurso para melhorar a acessibilidade para algumas pessoas enxergarem melhor ou até mesmo utilizar isso junto com a responsividade, aumentando ou diminuindo a fonte de acordo com o tamanho da tela do usuário. Então use e abuse da sua criatividade!

- É possível implementar dark mode/temas em qualquer sistema que utilizem essas tecnologias?
	> Me desculpe, mas por enquanto essa é a única pergunta que irei responder com "depende" rs. Talvez você entenda melhor isso fazendo um tour pelos arquivos de Sass deste projeto e ver como foi utilizado as cores e variáveis CSS, e comparar com algum de seus projeto em andamento, mas fique tranquilo, não vou fugir da pergunta. 
	Possível, eu até diria que é em qualquer sistema, mesmo que você demore meses ou até anos para implementar. Logo isso pode até ser possível, mas não viável, isso só você irá saber. Se você achou que isso depende da organização ou estrutura do projeto, você acertou!. Implementar isso em um projeto novo é fácil, não tem segredo, é só você lembrar de atribuir a variável CSS sempre que surgir um atributo relacionado a cor como: **color, background-color, box-shadow, etc.** e claro separar bem os componentes e as partes do sistema. Agora, implementar isso em um projeto com praticamente nenhuma padronização, eu garanto que você e/ou sua equipe terão um belo desafio pela frente.
