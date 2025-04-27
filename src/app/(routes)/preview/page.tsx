'use client';
import { Button } from '@shared/ui';
import { FC, useState } from 'react';

const PreviewPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="*:w-auto">
      <div>Outlined {'(Default)'}</div>
      <Button>Test</Button>
      <div>Contained</div>
      <Button variant="contained">Test</Button>
      <div>Outlined Disabled</div>
      <Button disabled>Test</Button>
      <div>Contained Disabled</div>
      <Button disabled variant="contained">
        Test
      </Button>
      <div>
        <input type="checkbox" checked={isLoading} onChange={() => setIsLoading(!isLoading)} />
      </div>
      <div>Outlined Loading</div>
      <Button loading={isLoading}>Test</Button>
      <div>Contained Loading</div>
      <Button loading={isLoading} variant="contained">
        Test
      </Button>
    </div>
  );
};

export default PreviewPage;
