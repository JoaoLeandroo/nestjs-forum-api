import { User } from '../../user/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Ansewers } from '@prisma/client';

export class Answer implements Ansewers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}
