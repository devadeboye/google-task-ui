import Image from 'next/image';

export default function TaskboardEmptyState({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-4/5 lg:w-1/2 m-auto text-center gap-4 ${className}`}
    >
      <Image
        src="/asset/images/no_task.png"
        alt="No tasks"
        width={128}
        height={128}
        priority // Preload the image
        className="object-contain"
      />
      <div className="text-lg">No tasks yet</div>
      <p className="text-sm">
        Add your to-dos and keep track of them across Devices
      </p>
    </div>
  );
}
