import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import z from 'zod';

@Injectable()
export class UserService {
  constructor(private validationService: ValidationService) {}

  sayHello(name: string, age: string): string {
    const schema = z.object({
      name: z.string().min(3).max(100),
      age: z
        .string()
        .regex(/^\d+$/, 'Age must be a number')
        .transform(Number)
        .refine((val) => val > 0 && val < 120, 'Age must be between 1 and 120'),
    });

    const result = this.validationService.validate(schema, { name, age });

    return `Hello ${result.name}, you are ${result.age} years old.`;
  }
}
