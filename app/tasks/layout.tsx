'use client';

import Modal from '../../components/ui/Modal';
import NavHeader from '../../components/ui/NavHeader';
import { useCreateTaskList } from '../../lib/hooks/use-task-list';
import { useModalStore } from '../../lib/stores/modalStore';
import CreateTaskListForm from './components/CreateTaskListForm';
import Sidebar from './components/Sidebar';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { createTaskListModal, closeCreateTaskListModal } = useModalStore();
  const createTaskListMutation = useCreateTaskList();

  const handleCreateList = (title: string) => {
    // Close modal immediately for better UX (optimistic)
    closeCreateTaskListModal();

    createTaskListMutation.mutate(title, {
      onError: () => {
        // If creation fails, reopen modal to show error
        // Note: You might want to show a toast/alert instead
        console.error('Failed to create task list');
      },
    });
  };

  return (
    <>
      <div className="bg-tasks-surface-container-highest min-h-screen color-subtle-black flex flex-col w-fit">
        <NavHeader />
        <div className="flex flex-row flex-1 relative max-w-svw">
          <Sidebar className={`w-64 absolute left-0 top-0 md:relative`} />
          <div className="w-svw md:flex-1 overflow-auto">{children}</div>
        </div>
      </div>

      {/* Global Create Task List Modal - Outside layout container */}
      <Modal
        isOpen={createTaskListModal}
        onClose={closeCreateTaskListModal}
        title="Create New List"
        className="w-full max-w-xs bg-white! rounded-4xl"
        hideDivider={true}
      >
        <CreateTaskListForm
          onSubmit={handleCreateList}
          onCancel={closeCreateTaskListModal}
          isLoading={createTaskListMutation.isPending}
        />
      </Modal>
    </>
  );
}
