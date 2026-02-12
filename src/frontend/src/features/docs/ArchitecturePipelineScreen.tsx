import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { docsContent } from './docsContent';

export function ArchitecturePipelineScreen() {
  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto max-w-5xl space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Architecture & Pipeline</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Technical documentation for the 3D Logo Creator application
          </p>
        </div>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="styling">Styling Logic</TabsTrigger>
            <TabsTrigger value="code">Code Samples</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Architecture</CardTitle>
                <CardDescription>High-level system design and component structure</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: docsContent.architecture }} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>3D Rendering Pipeline</CardTitle>
                <CardDescription>How the 3D logo is rendered and processed</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: docsContent.pipeline }} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="styling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deterministic Styling Logic</CardTitle>
                <CardDescription>How style presets map to materials and effects</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: docsContent.styling }} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Excerpts</CardTitle>
                <CardDescription>Key implementation examples from the codebase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Material System</h3>
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                    <code>{docsContent.codeExamples.materials}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold">State Management</h3>
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                    <code>{docsContent.codeExamples.state}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Export Pipeline</h3>
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                    <code>{docsContent.codeExamples.export}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
