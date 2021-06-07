import { ContainerModule, injectable } from "inversify";
import StartableService from "./StartableService";

export default interface IocContainer extends StartableService {
    getContainerModule(): ContainerModule;
}