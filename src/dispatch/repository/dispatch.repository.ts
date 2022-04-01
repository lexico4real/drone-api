import { EntityRepository, Repository } from 'typeorm';
import { Dispatch } from '../entities/dispatch.entity';

@EntityRepository(Dispatch)
export class DispatchRepository extends Repository<Dispatch> {}
