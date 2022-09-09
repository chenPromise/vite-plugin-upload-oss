interface optionsValue {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
}
declare function vitePluginUpLoadOss(options: optionsValue): {
    name: string;
    enforce: string;
    apply: string;
    configResolved: (config: any) => void;
    closeBundle: () => Promise<void>;
};

export { vitePluginUpLoadOss as default };
