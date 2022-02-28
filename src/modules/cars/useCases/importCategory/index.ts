import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryRepository = null

const importCategoryUseCase = new ImportCategoryUseCase(importCategoryRepository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }