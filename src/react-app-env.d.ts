/// <reference types="react-scripts" />

interface Window {
    ethereum: any;
}
interface ProviderMessage {
    type: string;
    data: unknown;
  }
interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}