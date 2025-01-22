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
    userId: any,
    questionId: number,
  ) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: {
          id: userId.sub,
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

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        answers: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id },
      include: {
        answers: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: { ...updateAnswerDto },
    });
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({
      where: { id },
    });
  }
}
