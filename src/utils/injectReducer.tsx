import React, { FC } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

interface Props {
  key: string;
  reducer: Function;
}

export default ({ key, reducer }: Props) => (WrappedComponent: FC) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withReducer(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    constructor(props: any, context: any) {
      super(props, context);

      getInjectors(context.store).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

const useInjectReducer = ({ key, reducer }: Props) => {
  const context = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    getInjectors(context.store as any).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
