import { createContext, useContext } from "react";
import invariant from "tiny-invariant";

import type { Env } from "./env";

const EnvContext = createContext<Env | null>(null);

export interface EnvProviderProps {
  env: Env;
  children: React.ReactNode;
}

export function EnvProvider(props: EnvProviderProps) {
  const { env, children } = props;
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
}

export function useEnv() {
  const env = useContext(EnvContext);
  invariant(env, "useEnv must be used within EnvContext");
  return env;
}
