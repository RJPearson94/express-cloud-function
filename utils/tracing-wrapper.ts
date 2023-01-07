import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { TraceExporter } from "@google-cloud/opentelemetry-cloud-trace-exporter";
import {
  SamplingDecision,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { SemanticAttributes } from "@opentelemetry/semantic-conventions";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const provider = new NodeTracerProvider({
  sampler: {
    shouldSample: (_context, _traceId, _spanName, _spanKind, attributes) => {
      if (attributes[SemanticAttributes.HTTP_METHOD] === "GET") {
        return { decision: SamplingDecision.NOT_RECORD };
      }
      return { decision: SamplingDecision.RECORD_AND_SAMPLED };
    },
    toString: () => "CustomSampler",
  },
});
registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations({
      // disable fs because the cloud trace export outputs a significant number of spans
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
});

const exporter = new TraceExporter({
  stringifyArrayAttributes: true,
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
