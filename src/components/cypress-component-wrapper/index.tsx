// @ts-nocheck
import { mount } from "@cypress/react";
import { FC } from "react";
import { Providers } from "../../contexts";

export function mountWithProps<T>(Component: FC<T>, props: T) {
  mount(
    <Providers>
      <Component {...props} />
    </Providers>
  );
}
