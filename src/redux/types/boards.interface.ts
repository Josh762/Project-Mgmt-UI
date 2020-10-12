
export interface BoardDetails {
    _id: string;
    title: string;
    description: string;
    workflow: Workflow;
}

export interface BoardStub {
    _id: string;
    owner: string;
    title: string;
    description: string;
    workflow: string;
}

interface Task {
    title: string;
    description: string;
}
