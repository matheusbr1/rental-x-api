import { SpecificationsReposity } from "../../repositories/implementations/SpecificationsRespository";
import { CreateSpecificationController } from "../createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsReposity()

const createSpecificationUseCase =  new CreateSpecificationUseCase(specificationsRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }