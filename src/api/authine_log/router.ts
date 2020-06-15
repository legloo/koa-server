import * as Router from 'koa-router';
import controller from './controller';
import { isAuthenticated, OwnsOrHasRole } from '../../auth/service';

let router = new Router({
    prefix: '/api/authine_logs'
});

// router.post('/', isAuthenticated(), controller.create);

// router.get('/:id', OwnsOrHasRole('admin', Address, 'user'), controller.show);

router.get('/',isAuthenticated(), controller.index);

router.post('/', isAuthenticated(),controller.create);

router.get('/:id',isAuthenticated(), controller.show);

router.put('/:id',isAuthenticated(), controller.update);

router.patch('/:id',isAuthenticated(), controller.update);

router.delete('/:id',isAuthenticated(), controller.destroy);

export default router;