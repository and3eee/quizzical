export interface Session {
  id?: number;
  date: Date;
  name: string;
  coreTags: string[];
  tags: string[];
  questions?: Question[];
  QuestionInstance?: QuestionInstance[];
}

export interface Question {
  id?: number;
  content: string;
  tags: string[];
  answer: string;
  level: number;
  isCoreQuestion:boolean;
  reviewedBy?: User[];
  reviewComments?:Comment[];
  lastReviewed: Date;
  expectedMinutes?: number;
  followUp?: Question;
}

export interface Comment {
  id: string;
  author: User;
  postedOn: Date;
  content: string;
}

export interface QuestionInstance {
  id: number;
  question?: Question;
  comments: Comment[];
  ranBy: User;
  session?: Session;
  passed: boolean;
}

export interface User {
  name: string;
  tags?: string[];
}


export interface Template { 
    id: number;

}