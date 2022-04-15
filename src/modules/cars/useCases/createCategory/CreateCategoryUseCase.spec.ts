import { AppError } from "@shared/errors/AppError"
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

// O repository inMemory é usado pois os 
// testes unitários não devem acessar o banco de dados

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    // Instanciando e Injetando dependência
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("should be able to create a new category", async () => {
    const category = { 
      name: "Category test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute(category)
    
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = { 
        name: "Category test",
        description: "Category description test"
      }
  
      // Gravando pela primeira vez
      await createCategoryUseCase.execute(category)
  
      // Espero que dê erro de categoria já existente
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})