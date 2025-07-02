'use client';
import { Button, Tab, Tabs } from '@shared/ui';
import { FC, useState } from 'react';

type TTabs = 'menu' | 'about';

const PreviewPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectTabId, setSelectTabId] = useState<TTabs>('menu');

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
        <input
          type="checkbox"
          checked={isLoading}
          onChange={() => {
            setIsLoading(!isLoading);
          }}
        />
      </div>
      <div>Outlined Loading</div>
      <Button loading={isLoading}>Test</Button>
      <div>Contained Loading</div>
      <Button loading={isLoading} variant="contained">
        Test
      </Button>
      <Tabs
        currentTabId={selectTabId}
        onChange={(id: TTabs) => {
          setSelectTabId(id);
        }}
      >
        <Tab key="1" id="menu">
          Menu
        </Tab>
        <Tab key="2" id="about">
          About
        </Tab>
      </Tabs>
    </div>
  );
};

export default PreviewPage;
