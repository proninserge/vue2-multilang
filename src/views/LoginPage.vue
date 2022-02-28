<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div>
        <h1>Login</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Email" prop="email">
            <el-input
              data-test="email"
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              data-test="password"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button data-test="submit" type="primary" @click="submitForm"
              >Submit</el-button
            >
            <el-button data-test="reset" @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import UserService from "@/api/UserService";
import { ElForm } from "element-ui/types/form";

@Component({})
export default class LoginPage extends Vue {
  @Ref("loginForm") readonly loginForm!: ElForm; // type of loginForm ref

  validateEmail = (
    rule: unknown,
    value: string,
    callback: (fn?: Error | (() => void)) => void
  ): void => {
    const validationRule =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validationRule.test(value)) {
      callback(new Error("Please input correct email"));
    } else {
      callback();
    }
  };

  ruleForm = {
    email: "",
    password: "",
  };

  get rules(): unknown {
    // computed
    const rules = {
      email: [
        { validator: this.validateEmail, trigger: "blur" },
        { required: true, message: "Please enter email", trigger: "blur" },
      ],
      password: [
        {
          min: 3,
          max: 50,
          message: "Length should be form 3 to 50",
          trigger: "blur",
        },
        { required: true, message: "Please enter password", trigger: "blur" },
      ],
    };
    return rules as typeof rules;
  }

  submitForm(): void | boolean {
    this.loginForm.validate(async (valid: boolean) => {
      if (valid) {
        try {
          const response = await UserService.login({
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          });
          const token = response.data;
          localStorage.setItem("currentUser", JSON.stringify(token));
          this.$router.push({ name: "Home" });
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("Error during submit");
        return false;
      }
    });
  }

  resetForm(): void {
    const ref = this.loginForm;
    ref.resetFields();
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}
</style>
