const path = require('path');
//Se añade este recurso del plugin de HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Se añade este recurso del plugin de CSS
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//Objeto donde viviran las configuraciones 
module.exports = {
    //Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
    //Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output:{
        //path es donde estará la carpeta donde se guardara los archivos 
        //Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo 
        //resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo para no tener conflictos entre Linuz, Windows, etc
        path: path.resolve(__dirname,"dist"),
        //filname le pone el nombre del archivo final 
        filename: 'bundle.js',
        publicPath:"./",
    },
    resolve:{
        //Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea 
        extensions:[".js",".jsx"], //JavaScript (.js) y React (.jsx)
        alias:{
            '@components': path.resolve(__dirname,'src/components/'),
            '@styles': path.resolve(__dirname,'src/styles/')
        }
    },
    mode:'production',
    module:{
        //rules: reglas que se van a establecer para como vamos a trabajar con los distintos tipos de archivos o elementos dentro del proyecto 
        rules:[
            {
                //test: nos va permitir saber de que tipo de extenciones vamos a utilizar, para ellos es necesario trabajar con expresiones regulares que nos van a decir como puede trabajar con distintas extensiones 
                test:/\.(js|jsx)$/,//Expresion regular, va utilizar JavaScript y React
                //exlude:s permite omitir archivos o carpetas especificas
                exclude: /node_modules/,
                //Para pasarle internamente lo que viene siendo el loader que vamos a utilizar  
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.html$/, //Identificar archivos HTML
                use:[
                    {
                        loader:"html-loader",
                    }
                ]
            },
            {
                test:/\.s[ac]ss$/,//Expresion regular pa identificar si es un archivo de CSS o SASS
                use:[
                    MiniCssExtracPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins:[
    //hacemos una instancia de lo que definimos en el inicio del archivo
    // le añadimos por parametro un objeto donde vamos a tener las 
    //configuraciones que le vamos anadir a nuestro plugin HTML
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
          }),
    //Creamos un nuevo plugin para css
        new MiniCssExtracPlugin({
            filename:'[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }

}