'use client';

import { trpc } from '@/libs/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

export const FetchBtn = () => {
  const [word, setWord] = useState<string>();
  const [enabled, setEnabled] = useState(false);
  const { data } = trpc.hello.useQuery(word, { enabled });
  const queryClient = useQueryClient();
  return (
    <div>
      <Text>{data}</Text>
      <Form
        onFinish={(values: { word: string }) => {
          setWord(values.word);
          if (enabled) {
            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.hello)
            });
          } else {
            setEnabled(true);
          }
        }}
      >
        <Form.Item name="word">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
