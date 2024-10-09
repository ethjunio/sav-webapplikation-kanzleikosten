import { PortletEntryParams } from '@/types/liferay.types';
import { createContext, useContext, PropsWithChildren } from 'react';

const PortletPropsContext = createContext<PortletEntryParams>({
  portletElementId: '',
  contextPath: '',
  portletNamespace: '',
  configuration: {
    system: {},
    portletInstance: {},
  },
});

export const PortletPropsProvider = ({ children, ...props }: PropsWithChildren<PortletEntryParams>) => {
  return <PortletPropsContext.Provider value={props}>{children}</PortletPropsContext.Provider>;
};

export const usePortletProps = () => {
  return useContext(PortletPropsContext);
};
