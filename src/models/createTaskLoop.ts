import Api from '@/api/modules';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect } from 'react';
import { Md5 } from 'ts-md5';

function getRandomStringFromArray(strings: string[]): string {
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
}
//
// const status = [
//   'exp5ja0cxywva1n68c8ca6m7zulfsxaw',
//   'exp5ja0cxo0xxhmz4y8300dd4f5n07zi',
//   'exp5ja0cxo0xxhmzco0400a01kwh81z8',
//   'exp5ja0cxo0xxhmzdfs500gauw701csb',
//   'exp5ja0cxywvd6ksy7kca7digjxttmp3',
//   'exp5ja0cxywvkedu5ugca8wzqhdx161r',
// ];
// const types = [
//   'exp5ja0cxsatvqtilzs5006mq740vavb',
//   'exp5ja0cxt1tam78ikg100p8f6seywc5',
//   'exp5ja0cxt1tjop6ig8200yjx720899u',
//   'exp5ja0cxt1tn11jtzs30069t4rn1u4h',
// ];
//
// const groups = [
//   'exp5ja0cxywpyx3a4xc2sxbvd38gx64a',
//   'exp5ja0cxywpvsa6p542swdk3qtzrgnx',
//   'exp5ja0cxywpsdmvkeg2sv82odqkuc23',
//   'exp5ja0cxywpp7icke82suqw5bieozux',
//   'exp5ja0cxywpmemu0q02stgd1ovyulof',
//   'exp5ja0cxt1tzwyjk3s400jk2r5bt12d',
// ];
// {"sortMapList":[{"id":"exp5ja0cxyxc5qauhj4zxoptvokyntm8","sort":1},{"id":"exp5ja0cxyxc5qauoh4zxpp55ubyweoo","sort":2},{"id":"exp5ja0cxyxcrn8f314zy1lq8rnodlm3","sort":3},{"id":"exp5ja0cxyxc5qauq0ozxqntkq35s9sj","sort":4}]}
const status = [
  'exp5ja0cxyxc5qauhj4zxoptvokyntm8',
  'exp5ja0cxyxc5qauoh4zxpp55ubyweoo',
  'exp5ja0cxyxcrn8f314zy1lq8rnodlm3',
  'exp5ja0cxyxc5qauq0ozxqntkq35s9sj',
];
const types = [
  'exp5ja0cxyxc5sigba8zxrvg6sg4wamv',
  'exp5ja0cxyxc5sigkjkzxs4kl8e6jv3y',
  'exp5ja0cxyxc5sigm34zxt2mnvozy2pf',
  'exp5ja0cxyxc5sigmuwzxu750ztsab9q',
  'exp5ja0cxyxc5signmozxv340gpuj9vt',
];
const groups = [
  'exp5ja0cxyxcd8ndlvczxxvj8pfw5ved',
  'exp5ja0cxyxcepwcfj4zxy34wkb1agzv',
  'exp5ja0cxyxcg6t8h6ozxz6kqr2b8pnw',
  'exp5ja0cxyxciibys6gzy0lgxla9rnln',
];

const max = 10;
let runCount = 0;

const users = ['100001', '100009'];

let taskList: any[] = [];

const useCreatTaskLoop = () => {
  const [query] = useQueryParams();
  const oneTask = () => {
    return Api.Task.createTask({
      name: Md5.hashStr(String(Date.now() + Math.random())),
      description:
        '描述还有他；老人客户；快乐又突然；了儿童宇航口头语儿童房好看' +
        Md5.hashStr(String(Date.now() + Math.random())),
      projectId: 'exp5ja0cxyxc5kmih68zxm56hq7p7wy9',
      statusId: getRandomStringFromArray(status),
      typeId: getRandomStringFromArray(types),
      handlerId: getRandomStringFromArray(users),
      groupId: getRandomStringFromArray(groups),
    });
  };

  const runTask = () => {
    if (taskList.length && runCount < max) {
      runCount++;
      const task = taskList.shift();
      console.log('开始执行');
      task().then(() => {
        runCount--;
        runTask();
      });
    }
  };

  const createTask = () => {
    if (!query.loop) return;
    for (let i = 0; i < 500000; i++) {
      taskList.push(oneTask);
      runTask();
    }
  };
  useEffect(createTask, []);
};
export default useCreatTaskLoop;
