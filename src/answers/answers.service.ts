import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(
    createAnswerDto: CreateAnswerDto,
    userId: number,
    questionId: number,
  ) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: {
          id: userId,
        },
      },
      question: {
        connect: {
          id: questionId,
        },
      },
    };

    return await this.prisma.ansewers.create({
      data: newAnswer,
    });
  }

  findAll() {
    return this.prisma.questions.findMany();
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.questions.update({
      where: { id },
      data: { ...updateAnswerDto },
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({
      where: { id },
    });
  }
}
