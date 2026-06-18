const fs = require('fs');
const path = require('path');
const { DocumentBuilder } = require('./nodejs_builder/builder');

function loadConfig(configPath) {
    const content = fs.readFileSync(configPath, 'utf8');
    const extension = path.extname(configPath).toLowerCase();
    
    if (extension === '.yaml' || extension === '.yml') {
        try {
            const yaml = require('yaml');
            return yaml.parse(content);
        } catch (error) {
            console.error('YAML parsing error:', error.message);
            console.error('Install with: npm install yaml');
            process.exit(1);
        }
    } else if (extension === '.json') {
        return JSON.parse(content);
    } else {
        console.error('Unsupported config file format. Use .json, .yaml, or .yml');
        process.exit(1);
    }
}

function main() {
    const args = process.argv.slice(2);
    const configArg = args.find(arg => arg.startsWith('--config='));
    
    if (!configArg) {
        console.error('Usage: node build_node.js --config <config_file>');
        process.exit(1);
    }
    
    const configPath = configArg.split('=')[1];
    
    if (!fs.existsSync(configPath)) {
        console.error(`Config file not found: ${configPath}`);
        process.exit(1);
    }
    
    const config = loadConfig(configPath);
    const builder = new DocumentBuilder(config);
    const outputPath = builder.build();
    
    console.log(`Document generated: ${outputPath}`);
}

if (require.main === module) {
    main();
}

module.exports = { DocumentBuilder, loadConfig };