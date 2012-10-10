find . -name '*.soy' | xargs java -jar libs/SoyToJsSrcCompiler.jar --outputPathFormat {INPUT_DIRECTORY}/{INPUT_FILE_NAME_NO_EXT}.js --shouldProvideRequireSoyNamespaces --shouldGenerateJsdoc
./buildDeps.sh
