import { Container, ContainerModule, injectable } from "inversify";
import StartableService from "./StartableService";

export default interface IocContainer {
    getContainerModule(): ContainerModule;
    start(container: Container): void;
}