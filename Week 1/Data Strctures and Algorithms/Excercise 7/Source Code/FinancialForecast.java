package Output;
public class FinancialForecast {

    public static double futureValue(double currentValue,double growthRate,int years) {
        // Base Case
        if (years == 0) {
            return currentValue;
        }

        // Recursive Case
        return futureValue(
            currentValue * (1 + growthRate),
            growthRate,
            years - 1
        );
    }

    public static void main(String[] args) {

        double presentValue = 10000;
        double growthRate = 0.10; // 10%
        int years = 3;

        double result =
                futureValue(presentValue,
                            growthRate,
                            years);

        System.out.println("Future Value after "
                + years + " years = "
                + result);
    }
}