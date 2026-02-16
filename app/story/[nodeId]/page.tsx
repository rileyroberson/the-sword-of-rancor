import StoryPageClient from "../../../components/StoryPageClient";
import { getAllNodeIds } from "../../../lib/storyData";

export function generateStaticParams() {
  return getAllNodeIds().map((nodeId) => ({ nodeId }));
}

export default async function StoryPage({ params }: { params: Promise<{ nodeId: string }> }) {
  const { nodeId } = await params;
  return <StoryPageClient nodeId={nodeId} />;
}
