import { ObjectKeys } from '@Src/shared/types/common.cd';
import { Tag } from 'swagger-jsdoc';

interface ApplicationTags {
  Security: Tag;
  Users: Tag;
}

const swaggerTags: ApplicationTags = {
  Security: {
    name: 'Security',
    description: 'user authentication module',
  },
  Users: {
    name: 'Users',
    description: '',
  },
};

export const getTags = (_swaggerTags: ApplicationTags): Array<Tag> => {
  const keys = Object.keys(_swaggerTags) as Array<ObjectKeys<ApplicationTags>>;
  const tags: Array<Tag> =
    keys.length > 0 ? keys.map((t) => _swaggerTags[t]) : [];
  return tags;
};

export default swaggerTags;
