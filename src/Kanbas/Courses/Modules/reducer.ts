import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  description: string;
  lessons: Lesson[];
}

interface ModuleWithState extends Module {
  expanded: boolean;
  editing: boolean;
}

interface ModulesState {
  modules: ModuleWithState[];
}

const initialState: ModulesState = {
  modules: []
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload.map((mod): ModuleWithState => ({
        ...mod,
        lessons: Array.isArray(mod.lessons) ? mod.lessons : [],
        expanded: false,
        editing: false,
      }));
    },

    addModule: (state, action: PayloadAction<Module>) => {
      const newModule: ModuleWithState = {
        ...action.payload,
        lessons: [],
        expanded: false,
        editing: false,
      };
      state.modules.push(newModule);
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },

    updateModule: (state, action: PayloadAction<ModuleWithState>) => {
      const index = state.modules.findIndex(
        (module) => module._id === action.payload._id
      );
      if (index !== -1) {
        state.modules[index] = {
          ...action.payload,
          editing: false,
        };
      }
    },

    editModule: (state, action: PayloadAction<string>) => {
      const module = state.modules.find(
        (module) => module._id === action.payload
      );
      if (module) {
        module.editing = true;
      }
    },

    addLesson: (state, action: PayloadAction<{ moduleId: string; name: string }>) => {
      const { moduleId, name } = action.payload;
      const module = state.modules.find(
        (module) => module._id === moduleId
      );
      if (module) {
        const newLesson: Lesson = {
          _id: new Date().getTime().toString(),
          name,
          module: moduleId,
        };
        module.lessons.push(newLesson);
      }
    },

    deleteLesson: (state, action: PayloadAction<string>) => {
      state.modules.forEach(module => {
        module.lessons = module.lessons.filter(
          lesson => lesson._id !== action.payload
        );
      });
    },

    updateLesson: (state, action: PayloadAction<{ lessonId: string; name: string }>) => {
      const { lessonId, name } = action.payload;
      state.modules.forEach(module => {
        const lesson = module.lessons.find(
          lesson => lesson._id === lessonId
        );
        if (lesson) {
          lesson.name = name;
        }
      });
    },

    setModuleExpansion: (state, action: PayloadAction<{ moduleId: string; expanded: boolean }>) => {
      const { moduleId, expanded } = action.payload;
      const module = state.modules.find(
        module => module._id === moduleId
      );
      if (module) {
        module.expanded = expanded;
      }
    },

    setAllModulesExpansion: (state, action: PayloadAction<boolean>) => {
      state.modules.forEach(module => {
        module.expanded = action.payload;
      });
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
  addLesson,
  deleteLesson,
  updateLesson,
  setModuleExpansion,
  setAllModulesExpansion,
} = modulesSlice.actions;

export default modulesSlice.reducer;