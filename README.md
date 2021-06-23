# sicar-app


Informações importantes
-

Framework: Angular - 6.1.0 </br>
Module bundler: Webpack - 4.41.4</br>
Code language(s): typescript, javascript, html, css, json



Build do Projeto para Produção - sem Webpack
-

```
ng build --prod
```
  
Build do Projeto para Produção - com Webpack
-
  
```
webpack --env prod
```

Equivalente:

```
npm run webpack-prod
```

Build do Projeto para Desenvolvimento - sem Webpack
-
  
```
ng build --configuration=dev
```

Build do Projeto para Desenvolvimento - com Webpack
-
  
```
webpack --env dev
```

Equivalente

```
npm run webpack-dev
```

Configurações 
-

<h3>De ambiente:</h3>
 
As configurações gerais do projeto estão nos arquivos de ambientes (*environment.ts*).
<h4>O projeto contém:</h4>

- **environment.ts**: Padrão utilizado pelo angular.
- **environment.dev.ts**: Utilizado em ambiente de desenvolvimento.
- **environment.prod.ts**: Utilizado em ambiente de produção.

Localizados em:

```
%ROOT%\src\environments\
```

Para selecionar algum ambiente com `ng build` ou `serve`, use:

```
--configuration= nomeAmbiente
```

Se for de produção, pode-se usar somente: `--prod`.
Para selecionar algum ambiente no `webpack` use:

```
--env nomeAmbiente
```

>**será necessário alterar a configuração ou criar uma configuração nova se forem feito novos  ambientes (*environments*)**.

  <h3>Do Webpack:</h3>
  
  As configurações do webpack são identificadas pelo nome: *webpack.{tipo}.js*
  <h4>O projeto contém:</h4>
  
  - **webpack.config.js**: De acordo com o ambiente escolhido, seleciona uma classe de configuração específica, utilize, após o comando *webpack*, --env + nome do ambiente, como por exemplo: `webpack --env prod`, lembre-se que isso procurará o arquivo pelo tipo, como, seguindo o exemplo acima: `webpack.prod.js`, se outro ambiente for criado, será necessário outro arquivo de configuração.
  - **webpack.common.js**: É a classe de configuração que contém elementos em comum entre as outras classes, funciona como "pai", como herança, não é utilizada diretamente. 
  - **webpack.dev.js**: Recebe as configurações do "webpack.common.js" e configura o ambiente de desenvolvimento.
  - **webpack.prod.js**: Recebe as configurações do "webpack.common.js" e configura o ambiente de produção.
  
  Localizados em:
  - webpack.confi.js e webpack.common.js estão localizados na raiz do projeto (`../src`, localização anterior ao *"src"*)
  - webpack.dev.js e webpack.prod.js estão localizados a partir da raiz, na pasta *"config"* (`./src/config`,localização posterior ao *"src"* , na pasta *"config"*)

Caso queira alterar o caminho da saída de determina extensão, vá no *"webpack.{tipo}.js"* em:
```
module: {
	rules: [
		{
			test:
			loaders: '{loader}
		},
	]
}
//...
```
Adicione `?name={path}/[name].[hash].[ext]'` após o `{loader}`, em `{path}` coloque caminho que deseje que seja a saída e `[name].[hash].[ext]` se deixar dessa maneira, o webpack fará as alterações sozinho, mas o nome pode ser alterado.
Em *"webpack.common.js"* é utilizado os seguintes *plugins*:

- `CleanWebpackPlugin(['dist'])`: Localiza a pasta, nesse caso com o nome *"dist"* e exclui todos os arquivos, para que esteja vazio quando o webpack for executado novamente.

- `HtmlWebpackPlugin()`: Facilita a criação de arquivos html, no caso é configurado:
-- `favicon`: Entrada do ícone da página.
--`template`: Entrada do template *.html* do projeto.
--`fileName`: Nome de saída do template *.html*.
--`chunks`: Adicionado nomes de *"chunks"* 

- `ManifestPlugin()`: Cria o arquivo `manifest.json` com referências de nomes originais dos arquivos.

Em *"webpack.prod.js"* é utilizado:
- O `UglifyJsPlugin` para compactação/minimizar o código de saída, para que funcione necessita que o *"minimize"* dentro de *"optimization"* esteja com valor *"true"*.
--O `include` do `UglifyJsPlugin`, recebe a extensão em que ele atuará, no projeto é utilizado a extensão *.js*
```
optimization: {
	minimize:  true,
	minimizer:[new UglifyJsPlugin({ include: /\.js$/})
//...
```
Tanto no *"webpack.dev.js"*, quanto no *"webpack.prod.js"*, em `module:{rules:[`, há um *"loader"* para substituir o ambiente (*environment.ts*) , caso seja criado mais configurações de ambiente aqui deverá conter o arquivo que será dissubstituído e qual substituirá.
```
{
	test: /environment\.ts?$/,
	loader:  'file-replace-loader',
	options: {
		condition:  true,
		replacement:  path.resolve(__dirname,'../src/environments/environment.prod.ts'),
		async:  true
	}
}
//...
```
- `test: /environment\.ts?$/`: Recebe o arquivo a ser substituído, neste caso o ambiente padrão (*environment .ts*).
- `loader:  'file-replace-loader'`: *"loader"* usado para substituição.
- `options:{}`: Contêm as opções do *"loader"* .
- `condition: true`: Condição para substituir.
- `replacement: path.resolve(__dirname,'../src/environments/environment.prod.ts')`: Diretório de busca do arquivo que substituirá o arquivo definido em `test:`, neste caso *"environment.ts"* será substituído por *"environment.prod.ts"*.
- `async: true`: Condição para carregar arquivos de forma assíncrona. 

Em `output`, a saída, do webpack, de acordo com a configuração, tem a seguinte configuração:
- `filename: [name].[hash].js`: Nome da saída, para os arquivos.
- `path:  path.resolve(__dirname, '../dist')`: Diretório de saída, no caso uma pasta acimada atual com o nome *"dist"*.
- `publicPath: './'`: O caminho de saída da *"view"* do Javascript/ página HTML .
  


Sobre arquivos
-

  <h3>Arquivos gerais:</h3>

**Os arquivos `.css`, imagens e fontes estão no diretório:**
```
%ROOT%\src\assets\
```

>com exceção aos arquivos ligados às páginas e ao `styles.css`, ele é o *css* principal que recebe a importação de todos os outros.

**Os arquivos `.ts` e `.html` estão no diretório:**
```
%ROOT%\src\app\
```
>com exceção aos arquivos principais do projeto que se encontram em: `%ROOT%\src\`, como *"main.ts"*, *"index.html"*, etc.

**Todos os módulos do *Angular material* são importados no aquivo *"material.module.ts"*, que é importado no *"app.module.ts".***
Estão localizados em:
```
//material.module.ts
%ROOT%\src\app\material\

//app.module.ts
%ROOT%\src\app\
```

**Preferencialmente importe todos os arquivos a partir do próprio caminho, o *auto import* funciona na build, porém não com o *webpack*, exemplo:**

```
//de:

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';  

//para:

import { LocalStorageService } from '../../services/local-storage.service';
import { AuthenticationService } from '../../services/authentication.service';
```

- Ao adicionar dependências novas no projeto, verifique a necessidade de importação delas no *vendor.ts*

- Ao mover arquivos, verifique a necessidade de remapeamento de importações, principalmente no *webpack.common.js*

- Ao adicionar arquivos, verifique a necessidade de remapeamento de *loaders* para que sua leitura possa ser realizada no *webpack.common.js*

Execução
-

Há várias formas de *"rodar"* o projeto, aqui será abordado sua execução no JBoss e no Apache Tomcat.

<h3><i>JBoss</i></h3>

Gerar a build, processo mostrado no inicio do documento, abra o cmd e enderesse ele para dentro da pasta da build, pasta *"dist"*, execute o comando `jar -cvf sicar-app.war *` (caso não identifique o comando, verifique se o jdk ou jre do estão como variáveis de ambiente ou execute o comando `C:\Program Files\Java\jdk1.8.0_251\bin\jar.exe -cvf sicar-app.war *` ), coloque o arquivo gerado dentro da pasta `%JBOSS_HOME%\standalone\deployments\` e pode executá-lo (para executá-lo é só ir em `%JBOSS_HOME%\bin\` e executar o arquivo *"standalone.bat"*). Agora ao acessar o ip do servidor JBoss, adicionando no final `/sicar-app`, será possível acessar a o projeto.

<h3><i>Apache Tomcat</i></h3>

Gerar a build, processo mostrado no inicio do documento, abra a pasta *"dist"* e copie tudo dentro dela, vá em `%TOMCAT_HOME%\webapp\` crie uma pasta com o nome do projeto, no casso "sicar", vá em `%TOMCAT_HOME%\bin\` execute o arquivo *"start.bat"*, vá no ip do servidor do Tomcat, adicionando no final `/sicar` (nome da pasta criada), será possível acessar a o projeto.
