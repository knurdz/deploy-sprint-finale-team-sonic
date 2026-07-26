export type DeadlineCard = {
  id: string;
  label: string;
  due: string;
  action: string;
};

export const deadlineCards: DeadlineCard[] = [
  {
    id: 'team-validation-checkpoint',
    label: 'Team validation checkpoint',
    due: 'Sunday 14:00',
    action: 'Validate the completed implementation and confirm all required task evidence.',
  },
  {
    id: 'review',
    label: 'Review rotation',
    due: 'Saturday 12:00',
    action: 'Assign a teammate to review the next feature pull request.',
  },
  {
    id: 'release',
    label: 'Release rehearsal',
    due: 'Sunday 16:00',
    action: 'Check the workflow status before completing your submission.',
  },
];