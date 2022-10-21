import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import { Car } from "./Car";

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @ManyToOne(type => Car, car => car.images)
  @JoinColumn({ name: "car_id" })
  car: Car

  @CreateDateColumn()
  created_at: Date

  @Expose({ name: 'image_url' })
  image_URL(): string {
    switch(process.env.disk) {
      case 'local': 
        return `${process.env.APP_API_URL}/cars/${this.image_name}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/cars/${this.image_name}`
      default: 
        return null
    }
  }

  constructor() {
    if(!this.id) {
      this.id = uuidv4()
    }
  }
}

export { CarImage }