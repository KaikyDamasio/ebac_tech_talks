const { file } = require("grunt");

module.exports = function(grunt){
    grunt.initConfig({ 
        pkg: grunt.file.readJSON('package.json'),

        less:{
            //configurando ambiente de desenvolvimento.
            development:{
                files: {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            //configurando ambiente de produção(ambiente que vai ser "upado no vercel!").
            production:{
                options:{
                    compress:true, 
                },
                files: {
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        //configurando tarefa watch(usada para atualizar o codigo automaticamente)
        watch:{
            less:{
                files:['src/styles/**/*.less'], // **- qualquer pasta. 
                tasks:['less:development'] //qual tarefa vai ser executada(carregada!).
            },
            
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            },
        },
       
       
        //plugin para modificar endereco do css (desenvolvimento)
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest:'dev/'
                    }
                ]
            },
            //plugin para modificar endereco do css (produção)
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                        
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['prebuild/index.html'],
                        dest:'dist/'
                    }
                ]
            }
        },
        //plugin para minificar o html!
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace:true,
                },
                files:{
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        //plugin para limpar a pasta temporaria (prebuild)!
        clean:['prebuild'],
        //plugin para minificar o js!
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js' :'src/scripts/main.js'
                }
            }
        }
    })

    //adicionando plugins.
    grunt.loadNpmTasks('grunt-contrib-less'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify')
    //criandoTasks.
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'replace:dist','clean','uglify']);
}