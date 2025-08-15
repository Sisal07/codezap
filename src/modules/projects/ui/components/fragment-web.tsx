import { Fragment } from "@/generated/prisma";
import { Hint } from "../components/hint";
import { Button } from "@/components/ui/button";
import { 
    ExternalLinkIcon, 
    RefreshCcwIcon, 
    CopyIcon, 
    MonitorIcon, 
    SmartphoneIcon, 
    TabletIcon 
} from "lucide-react";
import { useState } from "react";

interface Props {
    data: Fragment;
}

const devices = [
    { name: "Desktop", width: "100%", icon: MonitorIcon },
    { name: "Tablet", width: "768px", icon: TabletIcon },
    { name: "Mobile", width: "375px", icon: SmartphoneIcon },
];

export function FragmentWeb({ data }: Props) {
    const [copied, setCopied] = useState(false);
    const [fragmentKey, setFragmentKey] = useState(0);
    const [device, setDevice] = useState(devices[0]);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col w-full h-full rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-2 border-b bg-gray-50 flex items-center gap-x-2 flex-wrap">
                <Hint text= "Refresh" side="bottom" align="start">
                {/* Refresh */}
                <Button size="sm" variant="outline" onClick={onRefresh}>
                    <RefreshCcwIcon className="w-4 h-4" />
                </Button>
                </Hint>

                {/* Device selector */}
                {devices.map((d) => {
                    const Icon = d.icon;
                    return (
                        <Button
                            key={d.name}
                            size="sm"
                            variant={device.name === d.name ? "default" : "outline"}
                            onClick={() => setDevice(d)}
                            className="flex items-center gap-1"
                        >
                            <Icon className="w-4 h-4" />
                            {d.name}
                        </Button>
                    );
                })}
<Hint text= "Click to copy" side="bottom" align="start">
                {/* Copy URL */}
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    disabled={!data.sandboxUrl || copied}
                    className="flex-1 justify-start text-start font-normal"
                >
                    <CopyIcon className="w-4 h-4 mr-1" />
                    <span className="truncate">{data.sandboxUrl || "No URL"}</span>
                </Button>
                </Hint>

                {/* Open in new tab */}
                <Hint text= "Open in a new tab" side="bottom" align="start">

                <Button
                    size="sm"
                    disabled={!data.sandboxUrl}
                    variant="outline"
                    onClick={() => data.sandboxUrl && window.open(data.sandboxUrl, "_blank")}
                    >
                    <ExternalLinkIcon className="w-4 h-4" />
                </Button>
                </Hint>
            </div>

            {/* Iframe container */}
            <div className="flex-1 flex justify-center items-center bg-gray-100 p-4">
                <iframe
                    key={fragmentKey}
                    className="transition-all duration-300 rounded-lg border border-gray-300 bg-white shadow"
                    style={{
                        width: device.width,
                        height: "100%",
                    }}
                    sandbox="allow-forms allow-scripts allow-same-origin"
                    loading="lazy"
                    src={data.sandboxUrl}
                />
            </div>
        </div>
    );
}





/* import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, RefreshCcw, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    data: Fragment;
};

export function FragmentWeb({ data }: Props){
    const [copied, setCopied] = useState(false);
    const [fragmentKey, setFragmentKey] = useState(0);

    const onRefresh = () => {
        setFragmentKey((prev) => prev+1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl);
        setCopied(true);
        setTimeout(() => setCopied (false), 2000);
    };
    return(
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flexx items-center gap-x-2">
                <Button size="sm" variant="outline" onClick={onRefresh}>
                    
                    <RefreshCcwIcon/>
                </Button>
                 <Button 
                 size="sm"
                  variant="outline" 
                  onClick={handleCopy}
                  disabled={!data.sandboxUrl || copied}
                  className="flex-1 justify-start text-start font-normal"
                  >
                    
                    <span className="truncate" >
                        {data.sandboxUrl}
                    </span>
                </Button>
                <Button
                size="sm"
                disabled={!data.sandboxUrl}
                variant="outline"
                onClick={() => {
                    if(!data.sandboxUrl) return;
                    window.open(data.sandboxUrl, "_blank");
                }}
                >
                    <ExternalLinkIcon/>
                </Button>

            </div>
            <iframe
            className="h-full w-full"
            sandbox="allow-forms allow-scripts allow-same-origin"
            loading="lazy"
            src={data.sandboxUrl}
            />

        </div>
    )
};*/