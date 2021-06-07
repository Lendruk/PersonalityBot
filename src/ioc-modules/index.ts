import fs from 'fs';
import IocContainer from '../types/IocContainer';

const files = fs.readdirSync("./src/ioc-modules");

const modules: IocContainer[] = [];
for(const file of files.filter(file => file.includes(".js"))) {
    const module = require(`./${file.split('.')[0]}`).default;
    if(module) {
        modules.push(new module());
    }
}
export default modules;